const form = document.getElementById("car-create-form");
// input license plate trong form
const formLicensePlate = document.getElementById("license-plate");
const formRepairDate = document.getElementById("repair-date");
const formCustomerName = document.getElementById("customer-name");
const formCatalog = document.getElementById("catalog");
const formCarMaker = document.getElementById("car-maker");
const btnSave = document.getElementById("save");

// sử dụng form, thêm sự kiện SubmitEvent, arrow function, khi button save được click, form hợp lệ thì chạy sự kiện submit
form.addEventListener("submit", async e => {
	// ngăn mặc đinh submit
	e.preventDefault();
	//Lưu dữ liệu
	await save();
	//gọi hàm reset của form, xóa dữ liệu submit
	form.reset();
});

const [today] = new Date().toISOString().split("T");
formRepairDate.value = today;
formRepairDate.setAttribute("max", today);

async function save() {
	//Hiển thị loading, quay tròn
	showLoading();
	//hàm fetch gọi api truyền vào 2 đường dẫn
	const response = await fetch(
		//tham số thứ nhất
		"http://localhost:8080/api/v1/cars", 
		// tham số thứ 2 chứa các key value
		{			
		// thay cho postman
		method: "POST",
		headers: {
			// truyền header
			"Accept-Language": "vi",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			//truyền body
			licensePlate: formLicensePlate.value,
			repairDate: formRepairDate.value,
			customerName: formCustomerName.value,
			catalog: formCatalog.value,
			carMaker: formCarMaker.value
		})
	});
	const json = await response.json();
	console.log(json);
	hideLoading();
}

function showLoading() {
	// khi load sẽ không cho người dùng thao tác để tránh người dùng spam mà data chậm
	formLicensePlate.setAttribute("disabled", "");
	formRepairDate.setAttribute("disabled", "");
	formCustomerName.setAttribute("disabled", "");
	formCatalog.setAttribute("disabled", "");
	formCarMaker.setAttribute("disabled", "");
	btnSave.setAttribute("disabled", "");
}

function hideLoading() {
	//hàm chạy phương thức truyền vào sau 1 khoảng thời gian nào đó
	setTimeout(function () {
		formLicensePlate.removeAttribute("disabled");
		formRepairDate.removeAttribute("disabled");
		formCustomerName.removeAttribute("disabled");
		formCatalog.removeAttribute("disabled");
		formCarMaker.removeAttribute("disabled");
		btnSave.removeAttribute("disabled");
	}, Math.random() * 2000);
}
