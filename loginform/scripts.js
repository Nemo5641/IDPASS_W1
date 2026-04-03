/* =======================================================
   ส่วนที่ 1: การทำงานของหน้า Login Form
   ======================================================= */

// ฟังก์ชันสลับ Tab และจัดการการแสดง/ซ่อนช่องกรอกข้อมูล
function switchTab(event, tabName) {

    // จัดการเรื่องสีของปุ่ม Tab
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // จัดการการซ่อน/แสดงช่องกรอก
    const inputGroup = document.getElementById('dynamicInputGroup');
    const dynamicInput = document.getElementById('dynamicInput');

    // ถ้าเลือก OTP ให้ซ่อนช่องกรอกและไม่ต้องกรอกข้อมูล แต่ถ้าเลือก TOKEN ให้แสดงช่องกรอกและต้องกรอกข้อมูล
    if (tabName === 'OTP') {
        inputGroup.style.display = 'none';
        dynamicInput.required = false; 
    } else {
        inputGroup.style.display = 'block';
        dynamicInput.placeholder = 'Token';
        dynamicInput.required = true; 
    }
}

// ฟังก์ชันเปิด/ปิดการแสดงรหัสผ่าน
function togglePassword() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// เช็คก่อนว่ามีฟอร์ม Login อยู่บนหน้านี้ไหม (เพื่อป้องกัน Error ถ้าเอา Script นี้ไปใช้กับหน้าอื่นที่ไม่มีฟอร์ม Login)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;
        const dynamicVal = document.getElementById('dynamicInput').value;
        
        const activeTab = document.querySelector('.tab-button.active').innerText.trim();

        // เช็คว่ากรอก Username กับ Password มาครบหรือยัง (ไม่ต้องเช็ค Token เพราะถ้าเลือก OTP ช่องกรอกจะถูกซ่อนและไม่ต้องกรอก)
        if (!username || !password) {
            alert("กรุณากรอก Username และ Password ให้ครบถ้วน");
            return;
        }
        if (activeTab === 'TOKEN' && !dynamicVal) {
            alert("กรุณากรอก Token");
            return;
        }

        // บันทึกข้อมูลที่กรอกไว้ใน sessionStorage เพื่อให้หน้า Landing สามารถดึงไปใช้ได้
        sessionStorage.setItem('savedUsername', username);
        sessionStorage.setItem('savedMode', activeTab);

        // ถ้าเลือก Token ก็เก็บค่า Token ไว้ด้วย แต่ถ้าเลือก OTP ก็ไม่ต้องเก็บอะไรเพิ่ม
        if (activeTab === 'TOKEN') {
            sessionStorage.setItem('savedToken', dynamicVal);
        }

        window.location.href = 'landing.html';
    });
}

// ตรวจสอบว่ามีใคร Login เข้ามาหรือไม่ (จะทำงานบนหน้า Landing)
window.addEventListener('DOMContentLoaded', (event) => {
    const loggedInUser = sessionStorage.getItem('savedUsername');

    if (loggedInUser) {
        console.log(`"${loggedInUser}" ได้ทำการเข้าสู่ระบบแล้ว`);

        // ถ้าอยากให้แสดงแค่ครั้งเดียวตอนเพิ่งเข้ามา ให้เอาคอมเมนต์บรรทัดล่างออก
        // sessionStorage.removeItem('savedUsername'); 
    }
});


/* =======================================================
   ส่วนที่ 2: การทำงานของหน้า Landing Menu
   ======================================================= */

// ฟังก์ชันเปิด/ปิด Inbox
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

// ฟังก์ชันลากเมาส์เลื่อน (เช็คก่อนว่ามี Slider บนหน้านี้ไหม)
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
        if (window.innerWidth >= 768) return; 
        
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; 
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.style.cursor = 'grab';
}