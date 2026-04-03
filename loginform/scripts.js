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

// เช็คก่อนว่ามีฟอร์ม Login อยู่บนหน้านี้ไหม
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;
        const dynamicVal = document.getElementById('dynamicInput').value;
        
        const activeTab = document.querySelector('.tab-button.active').innerText.trim();

        // เช็คว่ากรอก Username กับ Password มาครบหรือยัง
        if (!username || !password) {
            alert("กรุณากรอก Username และ Password ให้ครบถ้วน");
            return;
        }
        if (activeTab === 'TOKEN' && !dynamicVal) {
            alert("กรุณากรอก Token");
            return;
        }

        // บันทึกข้อมูลที่กรอกไว้ใน sessionStorage
        sessionStorage.setItem('savedUsername', username);
        sessionStorage.setItem('savedMode', activeTab);

        // ถ้าเลือก Token ก็เก็บค่า Token ไว้ด้วย
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
        // sessionStorage.removeItem('savedUsername'); 
    }
});


/* =======================================================
   ส่วนที่ 2: การทำงานของหน้า Landing Menu
   ======================================================= */

// เพิ่มระบบสร้างเมนูอัตโนมัติจาก JSON
const menuData = [
  { "title": "Customer Portal", "url": "https://sit-mychannel.cdc.ais.th/customer-portal-info/portal", "icon_src": "pic/human.png" },
  { "title": "Sale", "url": "https://shopee.co.th/?mmp_pid=an_15300490356&uls_trackid=559g57g802r9&gad_campaignid=23045309932", "icon_src": "pic/cart.png" },
  { "title": "e-Waste (Point)", "url": "https://greener.bangkok.go.th/waste-recycle/e-waste/", "icon_src": "pic/waste.png" },
  { "title": "iKM", "url": "https://www.ikm.com/", "icon_src": "pic/ikm.png" },
  { "title": "My AIS (Download)", "url": "https://sit-mychannel.cdc.ais.th/app3steps/promote-qrcode", "icon_src": "pic/my_ais_ic_launcher.png" },
  { "title": "e-Leaflet", "url": "https://eleaflet.eu/", "icon_src": "pic/eleaf.png" },
  { "title": "สมัครแทนบัตร", "url": "https://pointblank.zepetto.com/th/news/view?idx=2192&page=1", "icon_src": "pic/mobile.png" },
  { "title": "แสดงตัวตน(NDID)", "url": "https://sit-mychannel.cdc.ais.th/digital-id/ndid/confirm-otp", "icon_src": "pic/user.png" },
  { "title": "เครื่อง", "url": "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fn1f5ht2ob4381.png", "icon_src": "pic/phone.png" },
  { "title": "ซิม", "url": "https://www.ea.com/games/the-sims/the-sims-4", "icon_src": "pic/sim.png" }
];

const slider = document.getElementById('menuSlider');

// เช็คว่ามีกล่องเมนูอยู่ในหน้าเว็บไหม (ป้องกัน Error) ก่อนจะสร้างเมนู
if (slider) {
    let menuHTML = '';
    menuData.forEach(item => {
        menuHTML += `
            <a href="${item.url}" class="menu-item">
                <div class="icon-circle"><img src="${item.icon_src}" alt="${item.title}"></div>
                <span>${item.title}</span>
            </a>
        `;
    });
    slider.innerHTML = menuHTML;
}



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

// ฟังก์ชันลากเมาส์เลื่อน 
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