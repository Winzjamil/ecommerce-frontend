import { useAuth } from '../context/AuthContext';
function UserDashboard() {
  const { user } = useAuth();
  return (
    <div>
      {user.map((u) => {
        <ul key={u.id}>
          <li>
            {u.fullName} <span>{u.role}</span>
          </li>
        </ul>;
      })}
    </div>
  );
}

export default UserDashboard;
