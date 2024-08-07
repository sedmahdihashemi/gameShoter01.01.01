

const _airplan = document.getElementById('airPlan')
const _tir = document.getElementsByClassName('tir')
const spans = document.querySelectorAll('#spans>img')
const spansArray = Array.from(spans);
const tog = document.getElementById('tog')
const closeButton = document.getElementById('closeButton')
const _aud = document.getElementById('aud')
closeButton.addEventListener('click' , ()=>{
    tog.style.display = 'none'
})



// console.log(_tir[0]);
let x = 0
let y = 0

function countdownAndExecute() {
    let count = 3;
    const countdownElement = document.createElement('div');
    countdownElement.style.position = 'fixed';
    countdownElement.style.top = '50%';
    countdownElement.style.left = '50%';
    countdownElement.style.transform = 'translate(-50%, -50%)';
    countdownElement.style.fontSize = '72px';
    countdownElement.style.fontWeight = 'bold';
    countdownElement.style.color = '#fff';
    countdownElement.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
    countdownElement.style.background = 'rgba(0,0,0,0.7)';
    countdownElement.style.borderRadius = '50%';
    countdownElement.style.width = '200px';
    countdownElement.style.height = '200px';
    countdownElement.style.display = 'flex';
    countdownElement.style.justifyContent = 'center';
    countdownElement.style.alignItems = 'center';
    countdownElement.style.transition = 'all 0.5s ease';
    document.body.appendChild(countdownElement);

    const countdownInterval = setInterval(() => {
        if (count > 0) {
            countdownElement.textContent = count;
            countdownElement.style.transform = 'translate(-50%, -50%) scale(1.2)';
            setTimeout(() => {
                countdownElement.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 200);
            count--;
        } else {
            clearInterval(countdownInterval);
            countdownElement.textContent = 'حمله';
            countdownElement.style.background = 'rgba(0,255,0,0.7)';
            setTimeout(() => {
                document.body.removeChild(countdownElement);
                executeCode();
            }, 1000);
        }
    }, 1000);
}

function executeCode() {
    // اینجا کد اصلی شما را قرار دهید
    console.log("کد اصلی اجرا شد!");
    // می‌توانید کد اصلی خود را اینجا اضافه کنید
}

countdownAndExecute();



_airplan.addEventListener('mousedown', () => {
    window.addEventListener('mousemove', drag)
    // console.log('yohodown');



})

_airplan.addEventListener('mouseup', (event) => {
    window.removeEventListener('mousemove', drag);
    
    x = event.clientX;
    y = event.clientY;

});

// Add a global mouseup event listener to handle cases where the mouse is released outside the element
window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', drag);
    // console.log('Global mouse up event triggered');
});


window.addEventListener('keypress', (e) => {
    // console.log(e.keyCode);
    if (e.keyCode === 32) {
       
        // console.log('32');
        // const tirRect = _tir[0].getBoundingClientRect();
        // const tirDistanceFromTop = tirRect.top + window.scrollY;
        const newTir = document.createElement('img');
        newTir.classList.add('tir', 'w-6', 'h-6','object-fit', '-top-2', 'left-[50%]', 'transform','translate-y-[-50%]', 'translate-x-[-50%]',  'absolute');
        // console.log(newTir);
        newTir.setAttribute('src','img/download (1).svg')
        _airplan.appendChild(newTir);
        // console.log(_airplan);
        // ذخیره موقعیت اولیه هواپیما
        const initialAirplanePosition = {
            x: _airplan.offsetLeft - 3,
            y: _airplan.offsetTop
        };

        // تنظیم موقعیت اولیه تیر نسبت به صفحه، نه نسبت به هواپیما
        const tirInitialPosition = {
            x: initialAirplanePosition.x + _airplan.offsetWidth / 2,
            y: initialAirplanePosition.y - 8 // 8 پیکسل بالاتر از هواپیما
        };

        // تنظیم موقعیت اولیه تیر به صورت مطلق
        newTir.style.position = 'fixed';
        newTir.style.left = `${tirInitialPosition.x - 10}px`;
        newTir.style.top = `${tirInitialPosition.y}px`;

        // حذف کلاس‌های نسبی
        newTir.classList.remove('left-[50%]', 'transform', 'translate-x-[-50%]', '-top-2');

        // حرکت تیر به سمت بالا، مستقل از حرکت هواپیما
        let topPosition = tirInitialPosition.y;
        const moveUp = setInterval(() => {
            topPosition -= 5; // سرعت حرکت تیر را می‌توانید تغییر دهید
            newTir.style.top = topPosition + 'px';
            // بررسی برخورد تیر با spans
            spans.forEach((span) => {
                const spanRect = span.getBoundingClientRect();
                const tirRect = newTir.getBoundingClientRect();

                if (
                    tirRect.left < spanRect.right &&
                    tirRect.right > spanRect.left &&
                    tirRect.top < spanRect.bottom &&
                    tirRect.bottom > spanRect.top
                ) {
                    // برخورد اتفاق افتاده است
                    // حذف span از آرایه spans
                    _aud.play()
                    const index = spansArray.indexOf(span);
                    if (index > -1) {
                        spansArray.splice(index, 1);
                    }
                    // بررسی اتمام موفقیت‌آمیز بازی
                    if (spansArray.length === 0) {
                        // ایجاد پاپ‌آپ
                        const popup = document.createElement('div');
                        popup.style.position = 'fixed';
                        popup.style.top = '50%';
                        popup.style.left = '50%';
                        popup.style.transform = 'translate(-50%, -50%)';
                        popup.style.padding = '20px';
                        popup.style.backgroundColor = 'rgba(0, 255, 0, 0.8)';
                        popup.style.borderRadius = '10px';
                        popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
                        popup.style.zIndex = '1000';
                        popup.style.textAlign = 'center';

                        const message = document.createElement('p');
                        message.textContent = 'سلام فرمانده';
                        message.style.fontSize = '24px';
                        message.style.color = 'white';
                        message.style.marginBottom = '20px';

                        const restartButton = document.createElement('button');
                        restartButton.textContent = 'شروع مجدد';
                        restartButton.style.padding = '10px 20px';
                        restartButton.style.fontSize = '18px';
                        restartButton.style.backgroundColor = 'white';
                        restartButton.style.border = 'none';
                        restartButton.style.borderRadius = '5px';
                        restartButton.style.cursor = 'pointer';

                        restartButton.onclick = () => {
                            window.location.reload();
                        };

                        popup.appendChild(message);
                        popup.appendChild(restartButton);
                        document.body.appendChild(popup);

                        // توقف بازی
                        clearInterval(moveUp);
                        window.removeEventListener('mousemove', drag);
                    }
                    
                    
                

                    span.style.display = 'none';
                    newTir.style.display = 'none';
                    clearInterval(moveUp);
                }
            });
            

            // بررسی خروج تیر از صفحه
            if (topPosition < -newTir.offsetHeight) {
                clearInterval(moveUp);
                document.body.removeChild(newTir);
            }
        }, 1); // فاصله زمانی بین هر حرکت را می‌توانید تنظیم کنید

        // انتقال تیر به body برای حرکت مستقل
        document.body.appendChild(newTir);
    }

})

// console.log(numRandRirht);


spans.forEach((val) => {

    let numRandRirht = Math.random() * 1100
    let numRandbottom = Math.random() * 600
    // console.log(val.style);
    val.style.right = numRandRirht + 'px'
    val.style.bottom = -numRandbottom + 'px'
    val.style.transition = (Math.random() * 1.5) + 's'

})

// تابع بررسی موقعیت spans
function checkSpansPosition() {
    const windowHeight = window.innerHeight;
    spansArray.forEach((span) => {
        const spanRect = span.getBoundingClientRect();
        if (spanRect.bottom >= windowHeight) {
            // توقف حرکت تمام spans
            spansArray.forEach((span) => {
                span.style.transition = 'none';
                span.style.animation = 'none';
            });
            showGameOverPopup();
            return;
        }
    });
}

// تابع نمایش پاپ آپ Game Over
function showGameOverPopup() {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    popup.style.zIndex = '1000';
    popup.style.textAlign = 'center';

    const message = document.createElement('p');
    message.textContent = 'باختی!!';
    message.style.fontSize = '24px';
    message.style.color = 'white';
    message.style.marginBottom = '20px';

    const restartButton = document.createElement('button');
    restartButton.textContent = 'شروع مجدد';
    restartButton.style.padding = '10px 20px';
    restartButton.style.fontSize = '18px';
    restartButton.style.backgroundColor = 'white';
    restartButton.style.border = 'none';
    restartButton.style.borderRadius = '5px';
    restartButton.style.cursor = 'pointer';

    restartButton.onclick = (e) => {
        // e.preventDefault()
        window.location.reload();
    };

    popup.appendChild(message);
    popup.appendChild(restartButton);
    document.body.appendChild(popup);

    // توقف بازی
    clearInterval(checkSpansInterval);
    window.removeEventListener('mousemove', drag);
}

// شروع بررسی موقعیت spans
const checkSpansInterval = setInterval(checkSpansPosition, 100);









// اجرای تابع بررسی در فواصل زمانی منظم
setInterval(checkSpansPosition, 100); // هر 100 میلی‌ثانیه بررسی می‌کند









function drag(e) {
    x = e.clientX 
    y = e.clientY
    _airplan.style.position = 'absolute'
    _airplan.style.top = y + 'px'
    _airplan.style.left = x + 'px'
  

}



