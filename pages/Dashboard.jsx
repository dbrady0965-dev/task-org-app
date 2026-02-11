import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import AdminTaskCreate from "../components/AdminTaskCreate";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


    const toggleComplete = async (task) => {
      const userId = auth.currentUser.uid;
      const taskRef = doc(db,"tasks", task.id);

      const isCompleted = task.completedBy?.includes(userId);

      await updateDoc(taskRef, {
        completedBy: isCompleted? arrayRemove(userId)
        : arrayUnion(userId)
      });

      // Uppdate UI
      setTasks(prev =>
        prev.map(t =>
          t.id === task.id? {
            ...t,
            completedBy: isCompleted? t.completedBy.filter(id => id !== userId)
            : [...(t.completedBy || []), userId]
          }
          :t
        )
      );
    };
  
  
   

  useEffect(() => {

    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      const userSnap = await getDoc(doc(db, "users", user.uid));
      const profile = userSnap.data();
      setUserProfile(profile);
      
      const q = query(
        collection(db, "tasks"),
        where("orgId", "==", profile.orgId)
      );

      const taskSnap = await getDocs(q);
      const taskList = taskSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const filteredTasks =
  profile.role === "admin"
    ? taskList
    : taskList.filter(task =>
        task.assignedUserIds.includes(user.uid)
      );

      setTasks(filteredTasks);
      setLoading(false);
    });

    
    
    return () => unsubscribe();
  }, []);

    const handleLogout = async () => {
      await signOut(auth);
};


  if (loading) return <p>Loading...</p>;
  if (!userProfile) return <p>No profile found</p>;

  
  return (
    <div>
      <button onClick={handleLogout}>
  Log out
</button>

      <h1>Dashboard</h1>

      {userProfile.role === "admin" && (
        <AdminTaskCreate orgId={userProfile.orgId} />
      )}

      <h2>Your Tasks</h2>

{tasks.length === 0 && <p>No tasks yet</p>}

<ul>
  {tasks.map(task => (
    <li key={task.id}>
      <label>
        <input 
          type="checkbox"
          checked={task.completedBy?.includes(auth.currentUser.uid)}
          onChange={() => toggleComplete(task)}
          />
          <strong>{task.title}</strong> - {task.schedule}
        </label>
    </li>
  ))}
</ul>

    </div>
  );
  
}


/*
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
  <div>
  <h1>Dashboard</h1>
  <button onClick={() => signOut(auth)}>Logout</button>
  </div>
  );

  const loadUser = async () => {
    const ref = doc(db, "users", auth.currentUser.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      navigate("/join");
      return;
    }

    const userData = snap.data();

    if (!userData.orId) {
      navigate("/join");
      return;
    }

    setLoading(false);
  };

  loadUser();
 [navigate];

if (loading) return <p>Loading...</p>;

return <h1>Dashboard</h1>;
};
*/





/*
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
*/

