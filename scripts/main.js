// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('name');

// Gắn biến vào nội dung thẻ p
const output = document.getElementById("ten");
const output2 = document.getElementById("ten2");

if (output) output.textContent = myParam || "";
if (output2) output2.textContent = myParam || "";

const googleSheetUrl = window.RSVP_SHEET_URL || "";
const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
    const attendanceInput = document.getElementById("rsvpAttendance");
    const guestsInput = document.getElementById("rsvpGuests");

    attendanceInput.addEventListener("change", function () {
        const attendance = attendanceInput.value.toLowerCase();
        if (attendance.includes("không")) {
            guestsInput.value = "0";
            guestsInput.disabled = true;
        } else if (!guestsInput.value || Number(guestsInput.value) < 1) {
            guestsInput.value = "1";
            guestsInput.disabled = false;
        } else {
            guestsInput.disabled = false;
        }
    });

    rsvpForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("rsvpName").value.trim();
        const attendance = document.getElementById("rsvpAttendance").value;
        const guests = document.getElementById("rsvpGuests").value || "1";
        const note = document.getElementById("rsvpNote").value.trim();
        const status = document.getElementById("rsvpStatus");
        const submitButton = rsvpForm.querySelector("button[type='submit']");

        if (!googleSheetUrl) {
            if (status) status.textContent = "Chưa cấu hình Google Sheet. Vui lòng thử lại sau.";
            return;
        }

        if (status) status.textContent = "Đang gửi xác nhận...";
        if (submitButton) submitButton.disabled = true;

        try {
            await fetch(googleSheetUrl, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({
                    guestName: name,
                    attendance: attendance,
                    guestCount: guests,
                    message: note,
                    pageUrl: window.location.href
                })
            });
            if (status) status.textContent = "Cảm ơn bạn đã xác nhận tham dự.";
            rsvpForm.reset();
        } catch (error) {
            if (status) status.textContent = "Chưa gửi được xác nhận. Vui lòng thử lại.";
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
}

const copyBankButton = document.querySelector("[data-copy-bank-account]");

if (copyBankButton) {
    copyBankButton.addEventListener("click", async function () {
        const account = copyBankButton.dataset.copyBankAccount || "1006844599";
        try {
            await navigator.clipboard.writeText(account);
        } catch (error) {
            const input = document.createElement("input");
            input.value = account;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            input.remove();
        }
        copyBankButton.textContent = "Đã sao chép";
        setTimeout(function () {
            copyBankButton.textContent = "Sao chép STK";
        }, 1600);
    });
}

const weddingTime = new Date(2026, 9, 25, 17, 0, 0).getTime();
const countdown = {
    days: document.querySelector("[data-countdown-days]"),
    hours: document.querySelector("[data-countdown-hours]"),
    minutes: document.querySelector("[data-countdown-minutes]"),
    seconds: document.querySelector("[data-countdown-seconds]")
};

function updateCountdown() {
    if (!countdown.days) return;

    const distance = Math.max(0, weddingTime - Date.now());
    const dayMs = 24 * 60 * 60 * 1000;
    const hourMs = 60 * 60 * 1000;
    const minuteMs = 60 * 1000;

    countdown.days.textContent = Math.floor(distance / dayMs);
    countdown.hours.textContent = String(Math.floor((distance % dayMs) / hourMs)).padStart(2, "0");
    countdown.minutes.textContent = String(Math.floor((distance % hourMs) / minuteMs)).padStart(2, "0");
    countdown.seconds.textContent = String(Math.floor((distance % minuteMs) / 1000)).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

if (!window.location.hash || window.location.hash === "#home") {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(function () {
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
    }, 10000);
}

   
})





// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function (event) {
    // On-page links
    if (
        location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
    ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $("html, body").animate(
                {
                    scrollTop: target.offset().top
                },
                1000,
                function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                }
            );
        }
    }
});
