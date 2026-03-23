
import ImportSearchView from './import-search-view';
import PendingPlaceList from './pending-place-list';

export default function AdminImportPage() {
  return (
    <div className="space-y-6">
      <ImportSearchView />
      <PendingPlaceList />
    </div>
  );
};


