import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, TextInput, Alert, StatusBar } from "react-native";

const GOLD = "#F5C542";
const BG = "#101112";
const CARD = "#1B1D20";
const MUTED = "#A7ABB2";
const LINE = "#303338";

const initialClients = [
  { id: "1", name: "Nguyễn Minh Anh", goal: "Tăng cơ", plan: "4 buổi/tuần", weight: "62 kg", status: "Đang tập" },
  { id: "2", name: "Trần Quốc Bảo", goal: "Giảm mỡ", plan: "5 buổi/tuần", weight: "81 kg", status: "Đang tập" },
  { id: "3", name: "Lê Thu Hà", goal: "Tăng sức mạnh", plan: "3 buổi/tuần", weight: "55 kg", status: "Sắp hết hạn" },
];

const exercises = [
  { day: "Thứ 2 · Ngực & tay sau", items: ["Barbell Bench Press — 3 × 8–10", "Incline Dumbbell Press — 3 × 10–12", "Cable Fly — 3 × 12–15", "Triceps Pushdown — 3 × 12"] },
  { day: "Thứ 3 · Lưng & tay trước", items: ["Lat Pulldown — 3 × 10", "Seated Cable Row — 3 × 10–12", "Dumbbell Row — 3 × 10 mỗi bên", "Dumbbell Curl — 3 × 12"] },
  { day: "Thứ 5 · Chân & bụng", items: ["Goblet Squat — 3 × 10", "Romanian Deadlift — 3 × 10", "Leg Press — 3 × 12", "Plank — 3 × 30–45 giây"] },
  { day: "Thứ 7 · Vai & toàn thân", items: ["Dumbbell Shoulder Press — 3 × 10", "Lateral Raise — 3 × 12–15", "Walking Lunge — 3 × 10 mỗi chân", "Farmer Carry — 3 lượt"] },
];

const meals = [
  { day: "Bữa sáng", name: "Yến mạch + sữa chua + chuối + trứng", kcal: "520 kcal", macro: "P 28g · C 65g · F 16g" },
  { day: "Bữa trưa", name: "Cơm, ức gà, rau luộc, dầu ô liu", kcal: "650 kcal", macro: "P 48g · C 75g · F 15g" },
  { day: "Bữa phụ", name: "Sữa tươi + sữa chua Hy Lạp + trái cây", kcal: "300 kcal", macro: "P 22g · C 35g · F 7g" },
  { day: "Bữa tối", name: "Cá hồi, khoai lang, salad rau", kcal: "580 kcal", macro: "P 38g · C 55g · F 20g" },
];

function Card({ children, style }) {
  return <View style={[{ backgroundColor: CARD, borderColor: LINE, borderWidth: 1, borderRadius: 16, padding: 16, marginBottom: 12 }, style]}>{children}</View>;
}
function Label({ children }) {
  return <Text style={{ color: MUTED, fontSize: 12, marginBottom: 6 }}>{children}</Text>;
}
function Metric({ label, value, hint }) {
  return <Card style={{ flex: 1, marginBottom: 0, minWidth: "45%" }}>
    <Label>{label}</Label><Text style={{ color: "#FFF", fontSize: 23, fontWeight: "800" }}>{value}</Text>
    {!!hint && <Text style={{ color: GOLD, fontSize: 12, marginTop: 6 }}>{hint}</Text>}
  </Card>;
}
function PrimaryButton({ title, onPress }) {
  return <TouchableOpacity onPress={onPress} style={{ backgroundColor: GOLD, paddingVertical: 13, paddingHorizontal: 16, borderRadius: 12, alignItems: "center" }}>
    <Text style={{ color: "#171717", fontWeight: "800" }}>{title}</Text>
  </TouchableOpacity>;
}

export default function App() {
  const [tab, setTab] = useState("Tổng quan");
  const [clients, setClients] = useState(initialClients);
  const [transactions, setTransactions] = useState([
    { id: "1", client: "Nguyễn Minh Anh", amount: 3000000, note: "Gói PT tháng", paid: true },
    { id: "2", client: "Trần Quốc Bảo", amount: 2500000, note: "Gói PT tháng", paid: true },
    { id: "3", client: "Lê Thu Hà", amount: 2000000, note: "Gói PT tháng", paid: false },
  ]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("Tăng cơ");
  const [clientFilter, setClientFilter] = useState("");
  const [mealGoal, setMealGoal] = useState("Tăng cơ");
  const [level, setLevel] = useState("Mới bắt đầu");

  const totalPaid = transactions.filter(t => t.paid).reduce((sum, t) => sum + t.amount, 0);
  const outstanding = transactions.filter(t => !t.paid).reduce((sum, t) => sum + t.amount, 0);
  const money = n => n.toLocaleString("vi-VN") + " đ";
  const filteredClients = clients.filter(c => c.name.toLowerCase().includes(clientFilter.toLowerCase()));

  const addClient = () => {
    if (!name.trim()) return Alert.alert("Thiếu thông tin", "Vui lòng nhập tên học viên.");
    setClients(prev => [...prev, { id: String(Date.now()), name: name.trim(), goal, plan: "Chưa thiết lập", weight: "Chưa cập nhật", status: "Mới" }]);
    setName("");
    Alert.alert("Đã thêm vào bản thử nghiệm", "Học viên được thêm vào danh sách trên thiết bị này.");
  };
  const addPayment = () => {
    Alert.prompt
      ? Alert.prompt("Thêm khoản thu", "Nhập số tiền (VNĐ)", value => {
          const amount = Number((value || "").replace(/[,. ]/g, ""));
          if (!amount || amount <= 0) return;
          setTransactions(prev => [...prev, { id: String(Date.now()), client: "Khoản thu mới", amount, note: "Thu thêm", paid: true }]);
        }, "plain-text", "1000000")
      : Alert.alert("Thêm khoản thu", "Bản demo hiện dùng dữ liệu mẫu. Trên Android, chức năng nhập khoản thu sẽ được bổ sung ở bước tiếp theo.");
  };

  const header = (title, subtitle) => <View style={{ marginBottom: 20 }}>
    <Text style={{ color: GOLD, fontSize: 12, fontWeight: "800", letterSpacing: 2 }}>GYM PT PRO</Text>
    <Text style={{ color: "#FFF", fontSize: 27, fontWeight: "900", marginTop: 6 }}>{title}</Text>
    <Text style={{ color: MUTED, marginTop: 5, lineHeight: 20 }}>{subtitle}</Text>
  </View>;

  const renderDashboard = () => <>
    {header("Tổng quan", "Chào bạn! Đây là tình hình PT của bạn.")}
    <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
      <Metric label="HỌC VIÊN" value={String(clients.length)} hint="Hồ sơ đang quản lý" />
      <Metric label="DOANH THU ĐÃ THU" value={money(totalPaid)} hint="Theo dữ liệu demo" />
    </View>
    <View style={{ flexDirection: "row", gap: 10, marginBottom: 18 }}>
      <Metric label="CHƯA THU" value={money(outstanding)} hint="Cần theo dõi" />
      <Metric label="LỊCH HÔM NAY" value="3 buổi" hint="Ví dụ minh họa" />
    </View>
    <Card>
      <Text style={{ color: "#FFF", fontWeight: "800", fontSize: 17, marginBottom: 12 }}>Việc cần làm</Text>
      {["Kiểm tra học viên sắp hết hạn gói tập", "Cập nhật cân nặng và số đo tuần này", "Rà soát giáo án và mức tạ"].map((s, i) =>
        <View key={s} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10, borderTopWidth: i ? 1 : 0, borderColor: LINE }}>
          <Text style={{ color: GOLD, marginRight: 10 }}>0{i + 1}</Text><Text style={{ color: "#E9EAEC", flex: 1 }}>{s}</Text>
        </View>)}
    </Card>
    <Card>
      <Text style={{ color: "#FFF", fontWeight: "800", fontSize: 17, marginBottom: 12 }}>Học viên gần đây</Text>
      {clients.slice(0, 3).map(c => <View key={c.id} style={{ paddingVertical: 10, borderTopWidth: 1, borderColor: LINE }}>
        <Text style={{ color: "#FFF", fontWeight: "700" }}>{c.name}</Text>
        <Text style={{ color: MUTED, marginTop: 4 }}>{c.goal} · {c.plan}</Text>
      </View>)}
    </Card>
  </>;

  const renderClients = () => <>
    {header("Học viên", "Quản lý hồ sơ và mục tiêu tập luyện.")}
    <Card>
      <Label>TÊN HỌC VIÊN MỚI</Label>
      <TextInput value={name} onChangeText={setName} placeholder="Ví dụ: Nguyễn Văn A" placeholderTextColor="#737780" style={inputStyle} />
      <Label>MỤC TIÊU</Label>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        {["Tăng cơ", "Giảm mỡ", "Tăng cân", "Sức mạnh", "Thể lực"].map(g => <Choice key={g} label={g} active={goal === g} onPress={() => setGoal(g)} />)}
      </View>
      <PrimaryButton title="+ Thêm học viên" onPress={addClient} />
    </Card>
    <TextInput value={clientFilter} onChangeText={setClientFilter} placeholder="Tìm tên học viên..." placeholderTextColor="#737780" style={inputStyle} />
    {filteredClients.map(c => <Card key={c.id}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "800" }}>{c.name}</Text>
          <Text style={{ color: MUTED, marginTop: 6 }}>{c.goal} · {c.plan}</Text>
          <Text style={{ color: MUTED, marginTop: 4 }}>Cân nặng: {c.weight}</Text>
        </View>
        <View style={{ alignSelf: "flex-start", backgroundColor: c.status === "Sắp hết hạn" ? "#4B3820" : "#20382D", paddingHorizontal: 9, paddingVertical: 6, borderRadius: 8 }}>
          <Text style={{ color: c.status === "Sắp hết hạn" ? GOLD : "#7BE0A5", fontSize: 11, fontWeight: "700" }}>{c.status}</Text>
        </View>
      </View>
    </Card>)}
  </>;

  const renderWorkout = () => <>
    {header("Giáo án tập", "Lịch mẫu 4 buổi/tuần · Điều chỉnh theo từng học viên.")}
    <Card>
      <Label>TRÌNH ĐỘ</Label>
      <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
        {["Mới bắt đầu", "Trung cấp", "Nâng cao"].map(v => <Choice key={v} label={v} active={level === v} onPress={() => setLevel(v)} />)}
      </View>
      <Text style={{ color: MUTED, fontSize: 12, marginTop: 12 }}>Mẫu minh họa; cần điều chỉnh khối lượng theo kỹ thuật, sức khỏe và khả năng hồi phục.</Text>
    </Card>
    {exercises.map((d, i) => <Card key={d.day}>
      <Text style={{ color: GOLD, fontWeight: "800", fontSize: 16 }}>{d.day}</Text>
      {d.items.map((it, j) => <View key={it} style={{ flexDirection: "row", paddingTop: 12, marginTop: 10, borderTopWidth: j ? 1 : 0, borderColor: LINE }}>
        <Text style={{ color: MUTED, width: 24 }}>{String(j + 1).padStart(2, "0")}</Text><Text style={{ color: "#F1F1F1", flex: 1, lineHeight: 20 }}>{it}</Text>
      </View>)}
      <Text style={{ color: MUTED, fontSize: 12, marginTop: 12 }}>Nghỉ 60–120 giây tùy bài và mức gắng sức.</Text>
    </Card>)}
  </>;

  const renderNutrition = () => <>
    {header("Dinh dưỡng", "Thực đơn mẫu có thể thay đổi theo mục tiêu và khẩu vị.")}
    <Card>
      <Label>MỤC TIÊU DINH DƯỠNG</Label>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {["Tăng cơ", "Giảm mỡ", "Tăng cân", "Duy trì"].map(v => <Choice key={v} label={v} active={mealGoal === v} onPress={() => setMealGoal(v)} />)}
      </View>
      <View style={{ height: 1, backgroundColor: LINE, marginVertical: 16 }} />
      <Text style={{ color: "#FFF", fontWeight: "800", fontSize: 16 }}>Mục tiêu: {mealGoal}</Text>
      <Text style={{ color: MUTED, marginTop: 6, lineHeight: 20 }}>Chưa tự tính nhu cầu năng lượng ở bản demo. Khi hoàn thiện, ứng dụng sẽ cần tuổi, giới tính, chiều cao, cân nặng, mức vận động và mục tiêu của học viên.</Text>
    </Card>
    {meals.map(m => <Card key={m.day}>
      <Label>{m.day.toUpperCase()}</Label>
      <Text style={{ color: "#FFF", fontWeight: "700", fontSize: 15, lineHeight: 22 }}>{m.name}</Text>
      <Text style={{ color: GOLD, fontWeight: "800", marginTop: 10 }}>{m.kcal}</Text>
      <Text style={{ color: MUTED, marginTop: 4 }}>{m.macro}</Text>
    </Card>)}
    <Text style={{ color: MUTED, fontSize: 12, lineHeight: 18 }}>Lưu ý: số liệu thực đơn là ước tính minh họa, không phải đơn thuốc dinh dưỡng. Cần kiểm tra dị ứng, bệnh lý và nhu cầu cá nhân trước khi áp dụng.</Text>
  </>;

  const renderRevenue = () => <>
    {header("Doanh thu PT", "Theo dõi khoản đã thu và khoản cần thu.")}
    <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
      <Metric label="ĐÃ THU" value={money(totalPaid)} />
      <Metric label="CÒN PHẢI THU" value={money(outstanding)} />
    </View>
    <PrimaryButton title="+ Thêm khoản thu" onPress={addPayment} />
    <Text style={{ color: MUTED, fontSize: 12, marginTop: 10, marginBottom: 12 }}>Các khoản dưới đây là dữ liệu mẫu trong phiên chạy này.</Text>
    {transactions.map(t => <Card key={t.id}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: "#FFF", fontWeight: "800" }}>{t.client}</Text>
          <Text style={{ color: MUTED, marginTop: 5 }}>{t.note}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ color: GOLD, fontWeight: "900" }}>{money(t.amount)}</Text>
          <Text style={{ color: t.paid ? "#7BE0A5" : "#FFB86B", fontSize: 11, marginTop: 5 }}>{t.paid ? "Đã thu" : "Chưa thu"}</Text>
        </View>
      </View>
      {!t.paid && <TouchableOpacity onPress={() => setTransactions(prev => prev.map(x => x.id === t.id ? { ...x, paid: true } : x))} style={{ marginTop: 12, borderTopWidth: 1, borderColor: LINE, paddingTop: 12 }}>
        <Text style={{ color: GOLD, fontWeight: "800" }}>Đánh dấu đã thu tiền →</Text>
      </TouchableOpacity>}
    </Card>)}
  </>;

  const tabs = [
    ["Tổng quan", "⌂"], ["Học viên", "♙"], ["Giáo án", "✚"], ["Dinh dưỡng", "◉"], ["Doanh thu", "₫"]
  ];
  let content = tab === "Tổng quan" ? renderDashboard() : tab === "Học viên" ? renderClients() : tab === "Giáo án" ? renderWorkout() : tab === "Dinh dưỡng" ? renderNutrition() : renderRevenue();

  return <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
    <StatusBar barStyle="light-content" backgroundColor={BG} />
    <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
      {content}
      <Text style={{ color: "#62666D", textAlign: "center", fontSize: 11, marginTop: 12 }}>GYM PT PRO · Bản thử nghiệm 0.1 · Dữ liệu chưa đồng bộ máy chủ</Text>
    </ScrollView>
    <View style={{ flexDirection: "row", backgroundColor: "#17181A", borderTopColor: LINE, borderTopWidth: 1, paddingBottom: 8, paddingTop: 8 }}>
      {tabs.map(([label, glyph]) => <TouchableOpacity key={label} onPress={() => setTab(label)} style={{ flex: 1, alignItems: "center", paddingVertical: 5 }}>
        <Text style={{ color: tab === label ? GOLD : MUTED, fontSize: 19, fontWeight: "800" }}>{glyph}</Text>
        <Text style={{ color: tab === label ? GOLD : MUTED, fontSize: 10, marginTop: 3, fontWeight: tab === label ? "800" : "500" }}>{label}</Text>
      </TouchableOpacity>)}
    </View>
  </SafeAreaView>;
}

const inputStyle = {
  backgroundColor: "#121315", borderColor: LINE, borderWidth: 1, borderRadius: 11,
  paddingHorizontal: 12, paddingVertical: 12, color: "#FFF", marginBottom: 14
};

function Choice({ label, active, onPress }) {
  return <TouchableOpacity onPress={onPress} style={{ borderRadius: 10, borderWidth: 1, borderColor: active ? GOLD : LINE, backgroundColor: active ? "#3A3218" : "#151618", paddingHorizontal: 11, paddingVertical: 9 }}>
    <Text style={{ color: active ? GOLD : "#D6D8DB", fontSize: 12, fontWeight: "700" }}>{label}</Text>
  </TouchableOpacity>;
}
