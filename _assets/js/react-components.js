import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

function LikeButton({ postId }) {
  const [likes, setLikes] = React.useState(0);

  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ 좋아요 {likes}
    </button>
  );
}

function renderLikeButtons() {
  document.querySelectorAll("#like-button").forEach((el) => {
    ReactDOM.render(<LikeButton postId={el.dataset.postId} />, el);
  });
}

// 초기 렌더링
renderLikeButtons();

// Turbo 페이지 전환 후에도 렌더링
document.addEventListener("turbo:load", () => {
  renderLikeButtons();
});
