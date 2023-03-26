import AdminUserCard from 'shared/components/AdminUserCard/AdminUserCard';

function AdminUserLayout() {
  return (
    <div className="container">
      <h1 className="title">使用者列表</h1>
      <section className="userCards">
        <AdminUserCard />
      </section>
    </div>
  );
}

export default AdminUserLayout;
