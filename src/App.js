import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import UserHomePage from "./pages/user/home/UserHomePage";
import DemoBanner from "./components/common/DemoBanner";
import GuideServicePage from "./pages/user/home/GuideServicePage";
import GuideSubmitPage from "./pages/user/home/GuideSubmitPage";
import GuideResultPage from "./pages/user/home/GuideResultPage";
import UserAboutPage from "./pages/user/etc/UserAboutPage";
import UserContactPage from "./pages/user/etc/UserContactPage";
import SubmitDetailPage from "./pages/user/submit/SubmitDetailPage";
import UploadFilesPage from "./pages/user/submit/UploadFilesPage";
import UserLoginPage from "./pages/user/auth/UserLoginPage";
import FindIdPage from "./pages/user/auth/FindIdPage";
import FindIdResultPage from "./pages/user/auth/FindIdResultPage";
import FindPasswordPage from "./pages/user/auth/FindPasswordPage";
import FindPasswordResultPage from "./pages/user/auth/FindPasswordResultPage";
import SignUpPage from "./pages/user/auth/SignUpPage";
import SignUpFailurePage from "./pages/user/auth/SignUpFailurePage";
import SignUpSuccessPage from "./pages/user/auth/SignUpSuccessPage";
import MyPage from "./pages/user/mypage/MyPage";
import ChangePasswordPage from "./pages/user/mypage/ChangePasswordPage";
import UserQuitPage from "./pages/user/mypage/UserQuitPage";
import UserNotificationPage from "./pages/user/mypage/UserNotificationPage";
import SubmitListPage from "./pages/user/submit/SubmitListPage";
import SubmitDetailViewPage from "./pages/user/submit/SubmitDetailViewPage";
import SubmitReportPage from "./pages/user/submit/SubmitReportPage";
import NotFoundPage from "./pages/common/NotFoundPage";
import AdminHomePage from "./pages/admin/home/AdminHomePage";
import UserLayout from "./pages/common/UserLayout";
import AdminLayout from "./pages/common/AdminLayout";
import AdminLoginPage from "./pages/admin/home/AdminLoginPage";
import AdminTaskPage from "./pages/admin/list/AdminTaskPage";
import AdminUserPage from "./pages/admin/list/AdminUserPage";
import AdminTotalAlarmPage from "./pages/admin/alarm/AdminTotalAlarmPage";
import AdminNotificationPage from "./pages/admin/alarm/AdminNotificationPage";
import RedirectRoute from "./pages/common/RedirectRoute";
import AdminSubmitDetailPage from "./pages/admin/list/AdminSubmitDetailPage";
import AdminSubmitReportPage from "./pages/admin/list/AdminSubmitReportPage";
import SubmitGuidePage from "./pages/user/submit/SubmitGuidePage";
import AdminUserDetailPage from "./pages/admin/list/AdminUserDetailPage";
import AdminPendingUserDetailPage from "./pages/admin/list/AdminPendingUserDetailPage";
import SubmitParametersPage from "./pages/user/submit/SubmitParametersPage";

import { USER_TYPE } from "./assets/data/data";
import { SubmitLayout } from "./pages/common/SubmitLayout";
import { ScreenshotSubmitLayout } from "./pages/common/ScreenshotSubmitLayout";
import AuthRedirectWatcher from "./components/common/AuthRedirectWatcher";

function App() {
  return (
    <HashRouter>
      <DemoBanner />
      <AuthRedirectWatcher />
      <Routes>
        {/* 1. User */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UserHomePage />} />
          {/* Guide */}
          <Route path="/guide/service" element={<GuideServicePage />} />
          <Route path="/guide/submit" element={<GuideSubmitPage />} />
          <Route path="/guide/result" element={<GuideResultPage />} />
          {/* Etc */}
          <Route path="/about" element={<UserAboutPage />} />
          <Route path="/contact" element={<UserContactPage />} />
          {/* Submit */}
          <Route path="/submit/guide" element={<SubmitGuidePage />} />
          <Route path="submit" element={<SubmitLayout />}>
            <Route
              path="/submit/details"
              element={
                <RedirectRoute type={USER_TYPE.USER}>
                  <SubmitDetailPage />
                </RedirectRoute>
              }
            />
            <Route
              path="/submit/upload"
              element={
                <RedirectRoute type={USER_TYPE.USER}>
                  <UploadFilesPage />
                </RedirectRoute>
              }
            />
            <Route
              path="/submit/parameters"
              element={
                <RedirectRoute type={USER_TYPE.USER}>
                  <SubmitParametersPage />
                </RedirectRoute>
              }
            />
          </Route>
          {/* Screenshot (figure capture) — same flow, larger typography */}
          <Route path="screenshot/submit" element={<ScreenshotSubmitLayout />}>
            <Route
              path="/screenshot/submit/details"
              element={
                <RedirectRoute type={USER_TYPE.USER}>
                  <SubmitDetailPage />
                </RedirectRoute>
              }
            />
            <Route
              path="/screenshot/submit/upload"
              element={
                <RedirectRoute type={USER_TYPE.USER}>
                  <UploadFilesPage />
                </RedirectRoute>
              }
            />
            <Route
              path="/screenshot/submit/parameters"
              element={
                <RedirectRoute type={USER_TYPE.USER}>
                  <SubmitParametersPage />
                </RedirectRoute>
              }
            />
          </Route>
          <Route
            path="/screenshot/submit/:submitNum"
            element={
              <RedirectRoute type={USER_TYPE.USER}>
                <SubmitDetailViewPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/submit/list"
            element={
              <RedirectRoute type={USER_TYPE.USER}>
                <SubmitListPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/submit/:submitNum"
            element={
              <RedirectRoute type={USER_TYPE.USER}>
                <SubmitDetailViewPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/submit/report/:submitNum"
            element={
              <RedirectRoute type={USER_TYPE.USER}>
                <SubmitReportPage />
              </RedirectRoute>
            }
          />
          {/* Auth */}
          <Route
            path="/login"
            element={
              <RedirectRoute type={USER_TYPE.USER} login>
                <UserLoginPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/find/id"
            element={
              <RedirectRoute type={USER_TYPE.USER} login>
                <FindIdPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/find/id/result"
            element={
              <RedirectRoute type={USER_TYPE.USER} login>
                <FindIdResultPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/find/password"
            element={
              <RedirectRoute type={USER_TYPE.USER} login>
                <FindPasswordPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/change/password"
            element={
              <RedirectRoute type={USER_TYPE.USER} login>
                <FindPasswordResultPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectRoute type={USER_TYPE.USER} login>
                <SignUpPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/signup/failure"
            element={
              <RedirectRoute type={USER_TYPE.USER} login>
                <SignUpFailurePage />
              </RedirectRoute>
            }
          />
          <Route
            path="/signup/success"
            element={
              <RedirectRoute type={USER_TYPE.USER} login>
                <SignUpSuccessPage />
              </RedirectRoute>
            }
          />
          {/* Mypage */}
          <Route
            path="/mypage"
            element={
              <RedirectRoute type={USER_TYPE.USER}>
                <MyPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/mypage/password"
            element={
              <RedirectRoute type={USER_TYPE.USER}>
                <ChangePasswordPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/mypage/quit"
            element={
              <RedirectRoute type={USER_TYPE.USER}>
                <UserQuitPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <RedirectRoute type={USER_TYPE.USER}>
                <UserNotificationPage />
              </RedirectRoute>
            }
          />
        </Route>
        {/* 2. Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <RedirectRoute type={USER_TYPE.ADMIN}>
                <AdminHomePage />
              </RedirectRoute>
            }
          />
          <Route path="login" element={<AdminLoginPage />} />
          <Route
            path="task"
            element={
              <RedirectRoute type={USER_TYPE.ADMIN}>
                <AdminTaskPage />
              </RedirectRoute>
            }
          />
          <Route
            path="submit/:submitNum"
            element={
              <RedirectRoute type={USER_TYPE.ADMIN}>
                <AdminSubmitDetailPage />
              </RedirectRoute>
            }
          />
          <Route
            path="submit/report/:submitNum"
            element={
              <RedirectRoute type={USER_TYPE.ADMIN}>
                <AdminSubmitReportPage />
              </RedirectRoute>
            }
          />
          <Route
            path="user"
            element={
              <RedirectRoute type={USER_TYPE.ADMIN}>
                <AdminUserPage />
              </RedirectRoute>
            }
          />
          <Route
            path="user/detail/:userId"
            element={
              <RedirectRoute type={USER_TYPE.ADMIN}>
                <AdminUserDetailPage />
              </RedirectRoute>
            }
          />
          <Route
            path="user/pending/detail/:userId"
            element={
              <RedirectRoute type={USER_TYPE.ADMIN}>
                <AdminPendingUserDetailPage />
              </RedirectRoute>
            }
          />
          <Route
            path="total/alarm"
            element={
              <RedirectRoute type={USER_TYPE.ADMIN}>
                <AdminTotalAlarmPage />
              </RedirectRoute>
            }
          />
          <Route
            path="notification"
            element={
              <RedirectRoute type={USER_TYPE.ADMIN}>
                <AdminNotificationPage />
              </RedirectRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
