import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import AdminTaskCreate from "../components/AdminTaskCreate";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const snap = await getDoc(doc(db, "users", user.uid));
      setUserProfile(snap.data());
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!userProfile) return <p>No profile found</p>;

  return (
    <div>
      <h1>Dashboard</h1>

      {userProfile.role === "admin" && (
        <AdminTaskCreate orgId={userProfile.orgId} />
      )}
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

