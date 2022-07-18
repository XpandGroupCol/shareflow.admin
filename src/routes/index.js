import { Route, Routes, BrowserRouter } from 'react-router-dom'

import PublicRoute from 'routes/PublicRoute'
import PrivateRoute from 'routes/PrivateRoute'

import SignInPage from 'pages/sign-in'
import ForgotPasswordPage from 'pages/forgot-password'
import RecoveryPasswordPage from 'pages/recovery-password'
import NotFoundPage from 'pages/not-found'

import CampaignPage from 'pages/campaings'
import ProfilePage from 'pages/profile'
import DashboardPage from 'pages/dashboard'
import WaitingPage from 'pages/waiting'
import FormatPage from 'pages/formats'
import TargetPage from 'pages/targets'
import AgePage from 'pages/ages'
import SectorPage from 'pages/sectors'
import UserPage from 'pages/users'
import CreateUserPage from 'pages/create-user'
import PublishersPage from 'pages/publishers'
import CreatePublisherPage from 'pages/create-publishers'
import EditUserPage from 'pages/edit-user'
import EditPublisherPage from 'pages/edit-publisher'
import CampaignViewPage from 'pages/campaign-view'
import CampaignEditPage from 'pages/campaing-edit'
import CampaignUpdatePage from 'pages/campaign-update'
import CampaignMediaPage from 'pages/campaing-media'
import CampaignPublisherPage from 'pages/campaign-publishers'

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path='/'
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path='auth/sign-in'
        element={
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        }
      />
      <Route
        path='auth/forgot-password'
        element={
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        }
      />
      <Route
        path='auth/recovery-password/:token'
        element={
          <PublicRoute>
            <RecoveryPasswordPage />
          </PublicRoute>
        }
      />

      <Route
        path='invitation'
        element={
          <PrivateRoute>
            <WaitingPage />
          </PrivateRoute>
        }
      />

      <Route
        path='formats'
        element={
          <PrivateRoute>
            <FormatPage />
          </PrivateRoute>
        }
      />

      <Route
        path='users'
        element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        }
      />

      <Route
        path='users/create'
        element={
          <PrivateRoute>
            <CreateUserPage />
          </PrivateRoute>
        }
      />

      <Route
        path='users/edit/:id'
        element={
          <PrivateRoute>
            <EditUserPage />
          </PrivateRoute>
        }
      />

      <Route
        path='publishers'
        element={
          <PrivateRoute>
            <PublishersPage />
          </PrivateRoute>
        }
      />

      <Route
        path='publishers/create'
        element={
          <PrivateRoute>
            <CreatePublisherPage />
          </PrivateRoute>
        }
      />

      <Route
        path='publishers/edit/:id'
        element={
          <PrivateRoute>
            <EditPublisherPage />
          </PrivateRoute>
        }
      />

      <Route
        path='targets'
        element={
          <PrivateRoute>
            <TargetPage />
          </PrivateRoute>
        }
      />

      <Route
        path='ages'
        element={
          <PrivateRoute>
            <AgePage />
          </PrivateRoute>
        }
      />

      <Route
        path='Sectors'
        element={
          <PrivateRoute>
            <SectorPage />
          </PrivateRoute>
        }
      />

      <Route
        path='campaigns'
        element={
          <PrivateRoute>
            <CampaignPage />
          </PrivateRoute>
        }
      />
      <Route
        path='campaigns'
        element={
          <PrivateRoute>
            <CampaignPage />
          </PrivateRoute>
        }
      />
      <Route
        path='campaigns/view/:id'
        element={
          <PrivateRoute>
            <CampaignViewPage />
          </PrivateRoute>
        }
      />
      <Route
        path='campaigns/:id'
        element={
          <PrivateRoute>
            <CampaignEditPage />
          </PrivateRoute>
        }
      >
        <Route index path='edit' element={<CampaignUpdatePage />} />
        <Route path='publishers' element={<CampaignPublisherPage />} />
        <Route path='media' element={<CampaignMediaPage />} />
      </Route>
      <Route
        path='profile'
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  </BrowserRouter>
)

export default Router
