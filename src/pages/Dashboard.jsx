function Dashboard({ onLogout }) {
  return (
    <div className="page-layout dashboard-page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h1>GST TODAY Control Center</h1>
        </div>
        <button className="logout-button" type="button" onClick={onLogout}>
          Sign out
        </button>
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <p className="card-label">Total Users</p>
          <strong>1,240</strong>
        </article>
        <article className="summary-card">
          <p className="card-label">Active Requests</p>
          <strong>72</strong>
        </article>
        <article className="summary-card">
          <p className="card-label">Pending Approvals</p>
          <strong>18</strong>
        </article>
        <article className="summary-card">
          <p className="card-label">Weekly Revenue</p>
          <strong>$12,480</strong>
        </article>
      </section>

      <section className="table-card">
        <div className="table-header">
          <div>
            <p className="eyebrow">Recent activity</p>
            <h2>Latest GST submissions</h2>
          </div>
          <button type="button">View all</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GST-1024</td>
              <td>Green Energy Ltd.</td>
              <td className="status approved">Approved</td>
              <td>$4,520</td>
            </tr>
            <tr>
              <td>GST-1025</td>
              <td>Prime Builders</td>
              <td className="status pending">Pending</td>
              <td>$2,800</td>
            </tr>
            <tr>
              <td>GST-1026</td>
              <td>Metro Care</td>
              <td className="status review">In review</td>
              <td>$1,900</td>
            </tr>
            <tr>
              <td>GST-1027</td>
              <td>Urban Foods</td>
              <td className="status approved">Approved</td>
              <td>$3,150</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Dashboard
