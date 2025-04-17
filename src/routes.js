import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RoleProtected from './components/common/RoleProtected';

// Lazy-loaded pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const MangaListPage = lazy(() => import('./pages/manga/MangaListPage'));
const MangaDetailPage = lazy(() => import('./pages/manga/MangaDetailPage'));
const FavoritesPage = lazy(() => import('./pages/manga/FavoritesPage'));
const ManageMangasPage = lazy(() => import('./pages/admin/ManageMangasPage'));
const ManageUsersPage = lazy(() => import('./pages/admin/ManageUsersPage'));
const ManageRequestsPage = lazy(() => import('./pages/admin/ManageRequestsPage'));
const ContentManagementPage = lazy(() => import('./pages/admin/ContentManagementPage'));
const ChaptersEditorPage = lazy(() => import('./pages/admin/ChaptersEditorPage'));
const UserProfilePage = lazy(() => import('./pages/user/UserProfilePage'));

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MangaListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/manga/:id" element={<MangaDetailPage />} />

            {/* Protected Routes */}
            <Route path="/favorites" element={
                <RoleProtected allowedRoles={['reader', 'editor', 'contentManager', 'moderator', 'admin']}>
                    <FavoritesPage />
                </RoleProtected>
            } />

            <Route path="/profile" element={
                <RoleProtected allowedRoles={['reader', 'editor', 'contentManager', 'moderator', 'admin']}>
                    <UserProfilePage />
                </RoleProtected>
            } />

            <Route path="/manage-mangas" element={
                <RoleProtected allowedRoles={['admin', 'moderator', 'contentManager']}>
                    <ManageMangasPage />
                </RoleProtected>
            } />

            <Route path="/manage-users" element={
                <RoleProtected allowedRoles={['admin']}>
                    <ManageUsersPage />
                </RoleProtected>
            } />

            <Route path="/manage-requests" element={
                <RoleProtected allowedRoles={['admin', 'moderator']}>
                    <ManageRequestsPage />
                </RoleProtected>
            } />

            <Route path="/content-management" element={
                <RoleProtected allowedRoles={['admin', 'moderator', 'contentManager']}>
                    <ContentManagementPage />
                </RoleProtected>
            } />

            <Route path="/edit-chapters" element={
                <RoleProtected allowedRoles={['admin', 'editor']}>
                    <ChaptersEditorPage />
                </RoleProtected>
            } />
        </Routes>
    );
}