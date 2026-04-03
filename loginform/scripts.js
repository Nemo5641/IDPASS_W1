/* =======================================================
   ส่วนที่ 1: ระบบหน้า Login Form
   ======================================================= */

// ฟังก์ชันสลับ Tab ระหว่าง OTP กับ Token
function switchTab(event, tabName) {
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    const inputGroup = document.getElementById('dynamicInputGroup');
    const dynamicInput = document.getElementById('dynamicInput');

    if (tabName === 'OTP') {
        inputGroup.style.display = 'none';
        dynamicInput.required = false; 
    } else {
        inputGroup.style.display = 'block';
        dynamicInput.placeholder = 'Token';
        dynamicInput.required = true; 
    }
}

// ฟังก์ชันแสดง/ซ่อนรหัสผ่าน
function togglePassword() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// ฟังก์ชันจัดการการส่งฟอร์ม Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;
        const dynamicVal = document.getElementById('dynamicInput').value;
        const activeTab = document.querySelector('.tab-button.active').innerText.trim();

        if (!username || !password) {
            alert("กรุณากรอก Username และ Password ให้ครบถ้วน");
            return;
        }
        if (activeTab === 'TOKEN' && !dynamicVal) {
            alert("กรุณากรอก Token");
            return;
        }

        sessionStorage.setItem('savedUsername', username);
        
        window.location.href = 'landing.html';
    });
}

/* =======================================================
   ส่วนที่ 2: ระบบหน้า Landing Menu
   ======================================================= */

// ตรวจสอบว่ามีผู้ใช้ Login เข้ามาหรือไม่ (แสดงใน Console)
window.addEventListener('DOMContentLoaded', (event) => {
    const loggedInUser = sessionStorage.getItem('savedUsername');
    if (loggedInUser) {
        console.log(`"${loggedInUser}" เข้าสู่ระบบแล้ว`);

        // ถ้าไม่อยากให้มันเด้งรัวๆ เวลารีเฟรชหน้า Landing ให้เอาคอมเมนต์บรรทัดล่างออก
        // sessionStorage.removeItem('savedUsername');
    }

    // ถ้าอยู่หน้า Landing Menu ให้ทำการโหลดเมนูจาก JSON
    if (document.getElementById('menuSlider')) {
        loadMenus();
    }
});

// ฟังก์ชันดึงข้อมูลจากไฟล์ JSON มาสร้างเป็นปุ่มเมนู
async function loadMenus() {
    const menuSlider = document.getElementById('menuSlider');
    
    try {
        const response = await fetch('menu.json');
        const menus = await response.json();
        
        menuSlider.innerHTML = '';

        menus.forEach(menu => {
            const menuHTML = `
                <a href="${menu.link}" class="menu-item" target="_blank">
                    <div class="icon-circle">
                        <img src="${menu.icon}" alt="${menu.title}">
                    </div>
                    <span>${menu.title}</span>
                </a>
            `;
            menuSlider.innerHTML += menuHTML;
        });

    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูลเมนู:", error);
        menuSlider.innerHTML = '<p style="padding:20px; text-align:center; width:100%; color:red;">ไม่สามารถโหลดข้อมูลเมนูได้</p>';
    }
}

// ระบบเปิด/ปิดกล่อง Inbox
function toggleInbox() {
    const content = document.getElementById("inboxContent");
    const arrow = document.getElementById("inboxArrow");
    const header = document.querySelector(".inbox-header");

    if (content) {
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            arrow.classList.remove("open");
            header.classList.remove("active");
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            arrow.classList.add("open");
            header.classList.add("active");
        }
    }
}

// ระบบลากเมาส์เลื่อน (สำหรับมือถือ/iPad แนวนอน)
const slider = document.getElementById('menuSlider');
if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        // ปิดการลากเมาส์เมื่ออยู่บน PC (กว้างเกิน 768px และเป็น Grid)
        if (window.innerWidth >= 768) return; 
        
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; 
        slider.scrollLeft = scrollLeft - walk;
    });
}