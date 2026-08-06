// SubmitReport.jsx
import React, { useEffect, useState } from "react";
import S from "./SubmitReport.styled";
import { useParams } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import ReportDocument from "../../pages/report/ReportDocument";
import { useAppDispatch, useAppSelector } from "../../assets/hooks/useRedux";
import { setLoading, setVisibleModal } from "../../stores/common/common.slice";
import { Box } from "@mui/material";
import { useI18n } from "../../assets/i18n";
import Loading from "../common/Loading";

const mergeReportPerformance = (performance, extra) => {
  const merged = {
    ...performance,
    overall: performance.overall || extra.performance_result_overall || {},
    bmi: performance.bmi || extra.performance_result_bmi || {},
    severity: performance.severity || extra.performance_result_severity || {},
    race: performance.race || extra.performance_result_race || {},
    age: performance.age || extra.performance_result_age || {},
  };
  const bmi_plot = performance.bmi_plot || extra.performance_result_bmi_plot || {};
  const age_plot = performance.age_plot || extra.performance_result_age_plot || {};
  const overall_plot =
    performance.overall_plot || extra.performance_result_overall_plot || {};
  const severity_plot =
    performance.severity_plot || extra.performance_result_severity_plot || {};
  const race_plot = performance.race_plot || extra.performance_result_race_plot || {};
  return { merged, bmi_plot, age_plot, overall_plot, severity_plot, race_plot };
};

const SubmitReport = () => {
  const { tf } = useI18n();
  const dispatch = useAppDispatch();
  const { isLoading, isVisibleModal } = useAppSelector(
    (state) => state.commonSlice
  );
  const { submitNum } = useParams();
  const token = useAppSelector((state) => state.userSlice.user.token);
  const urlPath = window.location.pathname;
  const [reportData, setReportData] = useState(null);
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;

  const blobToDataUrl = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const resolveImageSrc = async (imageUrl) => {
    try {
      if (!imageUrl) return null;
      if (imageUrl.startsWith("data:")) return imageUrl;

      const fullUrl = imageUrl.startsWith("http")
        ? imageUrl
        : `${BACKEND_URL}${imageUrl}`;

      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error(`Failed to fetch image at ${fullUrl}`);

      const blob = await response.blob();
      return await blobToDataUrl(blob);
    } catch (error) {
      console.error("Error resolving report image:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      setReportData(null);
      try {
        const apiEndpoint = urlPath.startsWith("/admin")
          ? `${BACKEND_URL}/report/admin/${submitNum}`
          : `${BACKEND_URL}/report/${submitNum}`;

        const response = await fetch(apiEndpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch report data");

        const jsonData = await response.json();
        if (!jsonData) throw new Error("Invalid data received from the API");

        const performance = jsonData.performance_results || {};
        const extra = jsonData.extra_info || {};
        const { merged, bmi_plot, age_plot, overall_plot, severity_plot, race_plot } =
          mergeReportPerformance(performance, extra);

        const resolvePlotMap = async (plotMap) =>
          Object.fromEntries(
            await Promise.all(
              Object.entries(plotMap).map(async ([key, value]) => {
                const dataUrl = await resolveImageSrc(value);
                return [key, dataUrl];
              })
            )
          );

        setReportData({
          extraInfo: extra,
          performanceResults: merged,
          imageSrcMap: {
            overall_plot: await resolvePlotMap(overall_plot),
            bmi_plot: await resolvePlotMap(bmi_plot),
            age_plot: await resolvePlotMap(age_plot),
            severity_plot: await resolvePlotMap(severity_plot),
            race_plot: await resolvePlotMap(race_plot),
          },
        });
      } catch (error) {
        console.error("Error fetching report data:", error);
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: "Error Fetching Data",
            text: `Failed to fetch data: ${error.message}`,
            isScrollable: true,
          })
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [submitNum, token, BACKEND_URL, dispatch, urlPath]);

  return (
    <S.Container>
      <div id="printable-content" className="performance-report">
        <Box
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {reportData ? (
            <PDFViewer
              key={`${submitNum}-report`}
              style={{ width: "100%", height: "100%", border: "none" }}
            >
              <ReportDocument
                extraInfo={reportData.extraInfo}
                performanceResults={reportData.performanceResults}
                imageSrcMap={reportData.imageSrcMap}
                tf={tf}
              />
            </PDFViewer>
          ) : null}
        </Box>

        {isLoading && <Loading />}
        {isVisibleModal && (
          <div className="modal">
            {tf("오류: 문제가 발생했습니다.", "Error: Something went wrong!")}
          </div>
        )}
      </div>
    </S.Container>
  );
};

export default SubmitReport;
