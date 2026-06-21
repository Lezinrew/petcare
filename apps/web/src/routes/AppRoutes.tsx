import { Routes, Route } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { HomePage } from '../pages/HomePage';
import { ExplorePage } from '../pages/ExplorePage';
import { BreedCatalogPage } from '../pages/BreedCatalogPage';
import { BreedDetailPage } from '../pages/BreedDetailPage';
import { MyPetsPage } from '../pages/MyPetsPage';
import { RemindersPage } from '../pages/RemindersPage';
import { AdoptionMatchPage } from '../pages/AdoptionMatchPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="my-pets" element={<MyPetsPage />} />
        <Route path="reminders" element={<RemindersPage />} />
        <Route path="adoption-match" element={<AdoptionMatchPage />} />
        <Route path=":speciesKey" element={<BreedCatalogPage />} />
        <Route path=":speciesKey/:slug" element={<BreedDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
