# GYM PT PRO — bản thử nghiệm 0.1

Ứng dụng mobile mẫu cho PT, giao diện tối đen-vàng, viết bằng Expo + React Native.

## Đang có trong bản mẫu
- Tổng quan học viên và khoản thu mẫu
- Danh sách học viên, thêm học viên trong phiên chạy
- Giáo án mẫu 4 buổi/tuần, lựa chọn cấp độ giao diện
- Thực đơn mẫu, lựa chọn mục tiêu dinh dưỡng
- Theo dõi khoản đã thu/chưa thu và đánh dấu khoản nợ đã thu

## Chưa có (cần làm ở giai đoạn tiếp theo)
- Đăng nhập thật và phân quyền
- Cơ sở dữ liệu đám mây, đồng bộ nhiều thiết bị, sao lưu
- Lưu dữ liệu bền vững sau khi đóng ứng dụng
- Tính calo/macro theo hồ sơ học viên, thư viện bài tập có ảnh/video
- Lịch tập và nhắc lịch, báo cáo doanh thu theo tháng, chi phí/lợi nhuận, xuất PDF/Excel
- Kiểm tra bảo mật và chính sách quyền riêng tư

> Dữ liệu đang dùng là dữ liệu demo. Không nhập thông tin nhạy cảm hoặc dùng làm hồ sơ học viên thật ở giai đoạn này.

## Cách chạy bằng máy tính
1. Cài Node.js bản LTS từ https://nodejs.org
2. Giải nén thư mục này.
3. Mở Terminal/Command Prompt trong thư mục `gym_pt_pro`.
4. Chạy:
   ```bash
   npm install
   npx expo start
   ```
5. Cài ứng dụng **Expo Go** trên iPhone/Android, quét QR hiện ra để mở bản thử nghiệm.
6. Nếu iPhone và máy tính không cùng mạng, thử `npx expo start --tunnel`.

## Lưu ý về iPhone
Bạn có thể xem và thử ứng dụng bằng Expo Go mà chưa cần đưa lên App Store. Để phát hành ứng dụng cài đặt chính thức, cần cấu hình tài khoản Apple Developer và quy trình build/phát hành phù hợp.

## Lộ trình phát triển đề xuất
1. Chốt cấu trúc hồ sơ học viên và gói PT.
2. Thêm backend đăng nhập, phân quyền PT và cơ sở dữ liệu (ví dụ Supabase).
3. Lưu giáo án, thực đơn, lịch tập, số đo và lịch sử thanh toán.
4. Bổ sung công thức dinh dưỡng, thư viện bài tập và báo cáo doanh thu.
5. Kiểm thử, sao lưu, bảo mật rồi mới dùng dữ liệu học viên thật.
