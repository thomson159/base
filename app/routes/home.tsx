import type { Route } from './+types/home';
import { Dashboard } from '~/components/Dashboard/Dashboard';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sales Dashboard' }, { name: 'description', content: 'Sales Dashboard' }];
}

export default function Home() {
  return <Dashboard />;
}
