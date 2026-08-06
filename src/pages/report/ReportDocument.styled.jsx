import { StyleSheet } from "@react-pdf/renderer";

const cellSize = 45;

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "NotoSans",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid black",
    marginBottom: 10,
    paddingBottom: 10,
  },
  logo: {
    width: 110,
    height: 40,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    paddingHorizontal: 8,
  },
  rightText: {
    textAlign: "right",
    fontSize: 9,
    width: 150,
  },
  section: {
    marginBottom: 12,
  },
  sectionBox: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "black",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoSectionIntro: {
    marginBottom: 10,
    lineHeight: 1.45,
    fontWeight: "normal",
  },
  infoItemBlock: {
    marginBottom: 10,
  },
  infoItemHeading: {
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 4,
  },
  infoSubItemHeading: {
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 4,
    marginLeft: 10,
  },
  infoItemBody: {
    marginLeft: 12,
    lineHeight: 1.45,
    fontWeight: "normal",
  },
  infoSubItemBody: {
    marginLeft: 22,
    lineHeight: 1.45,
    fontWeight: "normal",
  },
  infoItemText: {
    fontWeight: "normal",
  },
  infoBulletText: {
    fontWeight: "normal",
    marginLeft: 8,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: 20,
    borderBottom: "1px solid black" /* Adds horizontal lines between rows */,

  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
    borderBottom: "1px solid black" /* Adds horizontal lines between rows */,
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 8,
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderBottom:
      "1px solid black" /* Adds a horizontal line under the header */,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 5,
  },
  tableCellNoBorder: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  footnote: {
    marginTop: 10,
    fontSize: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 6,
  },
  detailItemBlock: {
    marginBottom: 6,
  },
  detailItemLabel: {
    fontWeight: "bold",
  },
  detailItemText: {
    marginLeft: 10,
  },

  subTitleDetail: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginTop: 2,
  },

  groupLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginTop: 2,
  },


  verticalLabelWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 200, 
  },

  verticalLabelRotated: {
    fontSize: 9,
    fontWeight: "bold",
    transform: "rotate(-90deg)",
  },

  centeredPredictionLabel: {
    fontSize: 9,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 4,
  },

  headerCell: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCellText: {
    fontSize: 9,
    fontWeight: "bold",
  },

  heatmapCell: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #000",
    padding: 1,
  },

  cellValue: {
    fontSize: 8,
  },
  cellPercent: {
    fontSize: 6,
    color: "gray",
  },

  emptyCornerCell: {
    width: 45,
    height: 45,
  },

  legendBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    marginRight: 4,
    border: "1px solid #000",
  },
  legendText: {
    fontSize: 9,
  },
});

export default styles;
