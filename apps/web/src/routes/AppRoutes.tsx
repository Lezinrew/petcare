import { Routes, Route } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { HomePage } from '../pages/HomePage';
import { DogsPage } from '../pages/DogsPage';
import { DogDetailPage } from '../pages/DogDetailPage';
import { MyPetsPage } from '../pages/MyPetsPage';
import { RemindersPage } from '../pages/RemindersPage';
import { AdoptionMatchPage } from '../pages/AdoptionMatchPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="dogs" element={<DogsPage />} />
        <Route path="dogs/:slug" element={<DogDetailPage />} />
        <Route path="my-pets" element={<MyPetsPage />} />
        <Route path="reminders" element={<RemindersPage />} />
        <Route path="adoption-match" element={<AdoptionMatchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
