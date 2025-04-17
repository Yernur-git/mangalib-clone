import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MangaListPage from './pages/manga/MangaListPage';
import MangaDetailPage from './pages/manga/MangaDetailPage';
import UserProfilePage from './pages/user/UserProfilePage';
import FavoritesPage from './pages/manga/FavoritesPage';
import ManageMangasPage from './pages/admin/ManageMangasPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ChaptersEditorPage from './pages/admin/ChaptersEditorPage';
import RoleProtected from './components/common/RoleProtected';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MangaListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/manga/:id" element={<MangaDetailPage />} />

            <Route path="/favorites" element={
                <RoleProtected allowedRoles={['reader', 'editor', 'contentManager', 'moderator', 'admin']}>
                    <FavoritesPage />
                </RoleProtected>
            } />

            <Route path="/dashboard" element={
                <RoleProtected allowedRoles={['reader', 'editor', 'contentManager', 'moderator', 'admin']}>
                    <DashboardPage />
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

            <Route path="/edit-chapters" element={
                <RoleProtected allowedRoles={['editor', 'admin']}>
                    <ChaptersEditorPage />
                </RoleProtected>
            } />
        </Routes>
    );
};

export default AppRoutes;