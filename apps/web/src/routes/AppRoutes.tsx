import { Routes, Route } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { HomePage } from '../pages/HomePage';
import { ExplorePage } from '../pages/ExplorePage';
import { DemoPage } from '../pages/DemoPage';
import { BreedCatalogPage } from '../pages/BreedCatalogPage';
import { BreedDetailPage } from '../pages/BreedDetailPage';
import { MyPetsPage } from '../pages/MyPetsPage';
import { RemindersPage } from '../pages/RemindersPage';
import { AdoptionMatchPage } from '../pages/AdoptionMatchPage';
import { ProfilePage } from '../pages/ProfilePage';
import { AdminPage } from '../pages/AdminPage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="demo" element={<DemoPage />} />
        <Route path="my-pets" element={<MyPetsPage />} />
        <Route path="reminders" element={<RemindersPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="privacidade" element={<PrivacyPolicyPage />} />
        <Route path="adoption-match" element={<AdoptionMatchPage />} />
        <Route path=":speciesKey" element={<BreedCatalogPage />} />
        <Route path=":speciesKey/:slug" element={<BreedDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
