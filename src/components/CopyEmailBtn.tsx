"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
// import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const CopyEmailBtn = () => {
  const copyToClipboardFallback = (email: string) => {
    const textarea = document.createElement("textarea");
    textarea.textContent = email;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        alert(`이메일이 복사되었습니다. ${email}`);
      } else {
        console.error("Copy command was unsuccessful");
      }
    } catch (err) {
      console.error("Fallback copy method failed", err);
    }

    document.body.removeChild(textarea);
  };

  const copyToClipboard = async () => {
    const adminEmail = "chronos9734@gmail.com";
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(adminEmail);
        alert("이메일이 복사되었습니다.");
      } else {
        copyToClipboardFallback(adminEmail);
      }
    } catch (err) {
      console.error("이메일 복사에 실패했습니다.", err);
      copyToClipboardFallback(adminEmail);
    }
  };

  return (
    <button type="button" onClick={copyToClipboard}>
      <FontAwesomeIcon icon={faAt} />
    </button>
  );
};

export default CopyEmailBtn;
