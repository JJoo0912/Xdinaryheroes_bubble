// 멤버별 이름 받아서 이미지 설정
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const member = getQueryParam('member');

if (location.pathname.includes("member.html") && member) {
  document.getElementById("member-name").textContent = member;
  document.getElementById("profile-img").src = `images/${member}_profile.jpg`;
  document.getElementById("background-img").src = `images/${member}_background.jpg`;
}

function goToChat() {
  location.href = `chat.html?member=${member}`;
}

// 채팅 불러오기
if (location.pathname.includes("chat.html") && member) {
  document.getElementById("chat-member-name").textContent = `${member}와의 채팅`;
  fetch(`chat/${member}.json`)
    .then(res => res.json())
    .then(data => {
      const chatBox = document.getElementById("chat-box");
      data.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `${item.sender === 'me' ? (document.getElementById("nickname").value || "나") : member}: ${item.message}`;
        div.className = item.sender;
        chatBox.appendChild(div);
      });
    });
}
