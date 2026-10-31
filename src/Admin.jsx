import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function Admin() {
  const [session, setSession] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [leagueName, setLeagueName] = useState("");
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    let active = true;

    async function checkUser(userSession) {
      if (!userSession) {
        if (active) {
          setSession(null);
          setAuthorized(false);
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userSession.user.id)
        .maybeSingle();

      if (!active) return;

      setSession(userSession);
      setAuthorized(!error && data?.role === "admin");
      setLoading(false);

      if (!error && data?.role === "admin") {
        loadData();
      } else {
        setMessage("บัญชีนี้ไม่มีสิทธิ์ผู้ดูแลระบบ");
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      checkUser(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        checkUser(newSession);
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function loadData() {
    const [leagueResult, teamResult] = await Promise.all([
      supabase.from("leagues").select("*").order("created_at", { ascending: false }),
      supabase.from("teams").select("*").order("name")
    ]);

    if (leagueResult.error || teamResult.error) {
      setMessage(
        leagueResult.error?.message || teamResult.error?.message
      );
      return;
    }

    setLeagues(leagueResult.data || []);
    setTeams(teamResult.data || []);
  }

  async function signIn(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setBusy(false);
    if (error) setMessage(error.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setAuthorized(false);
    setMessage("");
  }

  async function addLeague(event) {
    event.preventDefault();
    if (!leagueName.trim()) return;

    setBusy(true);
    setMessage("");

    const slug = leagueName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9ก-๙-]/g, "");

    const { error } = await supabase.from("leagues").insert({
      name: leagueName.trim(),
      slug: slug || `league-${Date.now()}`
    });

    setBusy(false);

    if (error) {
      setMessage(error.message);
    } else {
      setLeagueName("");
      setMessage("เพิ่มลีกเรียบร้อยแล้ว");
      loadData();
    }
  }

  async function addTeam(event) {
    event.preventDefault();
    if (!teamName.trim()) return;

    setBusy(true);
    setMessage("");

    const { error } = await supabase.from("teams").insert({
      name: teamName.trim()
    });

    setBusy(false);

    if (error) {
      setMessage(error.message);
    } else {
      setTeamName("");
      setMessage("เพิ่มทีมเรียบร้อยแล้ว");
      loadData();
    }
  }

  if (loading) {
    return <div className="admin-page">กำลังตรวจสอบสิทธิ์...</div>;
  }

  if (!session) {
    return (
      <div className="admin-page">
        <form className="admin-box" onSubmit={signIn}>
          <div className="admin-logo">BA PRO LEAGUE</div>
          <h1>ADMIN LOGIN</h1>
          <p>เข้าสู่ระบบสำหรับผู้ดูแลเท่านั้น</p>

          <label>อีเมล</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            required
          />

          <label>รหัสผ่าน</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button disabled={busy}>
            {busy ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>

          {message && <p className="admin-message">{message}</p>}
        </form>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="admin-page">
        <div className="admin-box">
          <h1>ACCESS DENIED</h1>
          <p>{message || "บัญชีนี้ไม่มีสิทธิ์ผู้ดูแลระบบ"}</p>
          <button onClick={signOut}>ออกจากระบบ</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-dashboard">
        <header className="admin-topbar">
          <div>
            <div className="admin-logo">BA PRO LEAGUE</div>
            <p>ADMIN CONTROL CENTER</p>
          </div>
          <button className="secondary-button" onClick={signOut}>
            ออกจากระบบ
          </button>
        </header>

        {message && <div className="admin-message">{message}</div>}

        <div className="admin-stats">
          <div><strong>{leagues.length}</strong><span>ลีกทั้งหมด</span></div>
          <div><strong>{teams.length}</strong><span>ทีมทั้งหมด</span></div>
        </div>

        <section className="admin-panel">
          <h2>เพิ่มลีกการแข่งขัน</h2>
          <form onSubmit={addLeague}>
            <input
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
              placeholder="ชื่อลีก เช่น BA VIP PRO LEAGUE"
              required
            />
            <button disabled={busy}>เพิ่มลีก</button>
          </form>

          <h3>รายการลีก</h3>
          {leagues.map((league) => (
            <div className="admin-list-item" key={league.id}>
              {league.name}
            </div>
          ))}
          {leagues.length === 0 && <p>ยังไม่มีข้อมูลลีก</p>}
        </section>

        <section className="admin-panel">
          <h2>เพิ่มทีม</h2>
          <form onSubmit={addTeam}>
            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="ชื่อทีม"
              required
            />
            <button disabled={busy}>เพิ่มทีม</button>
          </form>

          <h3>รายชื่อทีม</h3>
          {teams.map((team) => (
            <div className="admin-list-item" key={team.id}>
              {team.name}
            </div>
          ))}
          {teams.length === 0 && <p>ยังไม่มีข้อมูลทีม</p>}
        </section>
      </div>
    </div>
  );
}
