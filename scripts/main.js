// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('name');

// Gắn biến vào nội dung thẻ p
const output = document.getElementById("ten");
const output2 = document.getElementById("ten2");
const rsvpName = document.getElementById("rsvpName");

if (output) output.textContent = myParam || "";
if (output2) output2.textContent = myParam || "";
if (rsvpName && myParam) rsvpName.value = myParam;

const zaloPhone = "0936459577";
const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("rsvpName").value.trim();
        const attendance = document.getElementById("rsvpAttendance").value;
        const guests = document.getElementById("rsvpGuests").value || "1";
        const note = document.getElementById("rsvpNote").value.trim();
        const status = document.getElementById("rsvpStatus");
        const message = [
            "Xác nhận tham dự tiệc cưới Hồng Nhung & Huy Hùng",
            "Tên: " + name,
            "Phản hồi: " + attendance,
            "Số người tham dự: " + guests,
            note ? "Lời nhắn: " + note : ""
        ].filter(Boolean).join("\n");

        navigator.clipboard?.writeText(message).catch(function () {});
        if (status) status.textContent = "Đã sao chép nội dung xác nhận. Vui lòng dán vào khung chat Zalo vừa mở.";
        window.open("https://zalo.me/" + zaloPhone, "_blank", "noopener");
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
