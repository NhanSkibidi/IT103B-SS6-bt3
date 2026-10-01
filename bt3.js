let choice;
let cardCode = "";
let memberType = "";
let lockerZone = "";
let materialLog = "";
let isValidCard = false;
let materialFee = 0;
let deposit = 0;

do {
    console.log("\n===== QUẢN LÝ HẬU CẦN GYM =====");
    console.log("1. Xác thực thẻ hội viên");
    console.log("2. Ghi nhận vật tư mượn thêm");
    console.log("3. In phiếu bàn giao");
    console.log("4. Đóng ca và thoát");

    choice = prompt("Nhập lựa chọn:");

    switch (choice) {
        case "1":
            cardCode = prompt("Nhập mã thẻ:");
            cardCode = cardCode.trim().toUpperCase();

            if (cardCode.startsWith("GYM-VIP-")) {
                memberType = "VIP";
                lockerZone = "ZONE-A";
                isValidCard = true;
            } else if (cardCode.startsWith("GYM-STANDARD-")) {
                memberType = "STANDARD";
                lockerZone = "ZONE-B";
                isValidCard = true;
            } else {
                isValidCard = false;
                console.log("Thẻ không hợp lệ!");
            }

            if (isValidCard) {
                console.log("Xác thực thẻ thành công!");
                console.log("Hạng:", memberType);
                console.log("Khu tủ:", lockerZone);
            }
            break;

        case "2":
            if (!isValidCard) {
                console.log("Vui lòng xác thực thẻ trước!");
                break;
            }

            materialLog = prompt("Nhập vật tư mượn thêm:");
            materialLog = materialLog.trim().toUpperCase();

            let temp = materialLog;
            materialFee = 0;
            deposit = 0;

            while (temp.length > 0) {
                let separator = temp.indexOf("|");
                let item;

                if (separator === -1) {
                    item = temp;
                    temp = "";
                } else {
                    item = temp.slice(0, separator);
                    temp = temp.slice(separator + 1);
                }

                let colon = item.indexOf(":");
                let name = item.slice(0, colon);
                let quantity = Number(item.slice(colon + 1));

                if (name === "TOWEL") {
                    if (memberType === "VIP") {
                        quantity = quantity - 1;
                        if (quantity < 0) {
                            quantity = 0;
                        }
                    }
                    materialFee += quantity * 20000;
                    deposit += quantity * 50000;
                } else if (name === "LOCK") {
                    materialFee += quantity * 15000;
                    deposit += quantity * 50000;
                }
            }

            console.log("Đã ghi nhận vật tư!");
            break;

        case "3":
            if (!isValidCard) {
                console.log("Vui lòng xác thực thẻ trước!");
                break;
            }

            console.log("\n" + "-".repeat(45));
            console.log("PHIẾU BÀN GIAO TỦ ĐỒ");
            console.log("-".repeat(45));
            console.log("Mã thẻ:".padEnd(20) + cardCode);
            console.log("Hạng hội viên:".padEnd(20) + memberType);
            console.log("Khu tủ:".padEnd(20) + lockerZone);
            console.log("Phí vật tư:".padEnd(20) + materialFee + " VNĐ");
            console.log("Tiền đặt cọc:".padEnd(20) + deposit + " VNĐ");
            console.log("Tổng cần thu:".padEnd(20) + (materialFee + deposit) + " VNĐ");
            console.log("-".repeat(45));
            break;

        case "4":
            console.log("Đã đóng ca làm việc!");
            break;

        default:
            console.log("Lựa chọn không hợp lệ!");
    }
} while (choice !== "4");