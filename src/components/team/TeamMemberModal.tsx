import { useEffect, useRef, useState } from "react";
import { MEMBER_ORDER, members } from "@/data/members";
import { descToHtml, experienceToHtml } from "@/lib/html";
import { useModal } from "@/context/modalContext";
import { Modal } from "@/components/ui/Modal";

export function TeamMemberModal() {
  const { state, closeTeamMember, openTeamMember } = useModal();
  const open = state.type === "team";
  const memberId = open ? state.memberId : null;
  const [detailOpen, setDetailOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDetailOpen(false);
    scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [memberId]);

  const data = memberId ? members[memberId] : null;
  if (!open || !memberId || !data) return null;

  const descHtml = detailOpen
    ? experienceToHtml(data.experience)
    : descToHtml(data.desc);

  const go = (delta: number) => {
    const idx = MEMBER_ORDER.indexOf(memberId);
    const nextId =
      MEMBER_ORDER[(idx + delta + MEMBER_ORDER.length) % MEMBER_ORDER.length];
    openTeamMember(nextId);
  };

  return (
    <Modal
      open={open}
      onClose={closeTeamMember}
      labelledBy="teamMemberTitle"
      className="modal modal--team-member"
      panelClassName={`tmm-panel${detailOpen ? " tooltip--expanded" : ""}`}
      backdropDataAttr="data-close-team-modal"
      closeDataAttr="data-close-team-modal"
    >
      <button
        type="button"
        className="tmm-close"
        data-close-team-modal
        aria-label="Закрыть"
        onClick={closeTeamMember}
      >
        ×
      </button>
      <header className="tmm-head">
        <div className="tmm-head-text">
          <h3 className="tmm-name" id="teamMemberTitle">
            {data.name}
          </h3>
          <p className="tmm-role mono">{data.role}</p>
        </div>
      </header>
      <div className="tmm-scroll" ref={scrollRef}>
        <div className="tmm-body">
          <div
            className="tmm-desc"
            dangerouslySetInnerHTML={{ __html: descHtml }}
          />
          {!detailOpen ? (
            <div className="tmm-stats">
              <article className="tmm-stat">
                <span className="tmm-stat-icon" aria-hidden="true" />
                <span className="tmm-stat-val">{data.s1}</span>
                <span className="tmm-stat-lab mono">Опыт</span>
              </article>
              <article className="tmm-stat">
                <span className="tmm-stat-icon" aria-hidden="true" />
                <span className="tmm-stat-val">{data.s2}</span>
                <span className="tmm-stat-lab mono">{data.s2Lab}</span>
              </article>
              <article className="tmm-stat">
                <span className="tmm-stat-icon" aria-hidden="true" />
                <span className="tmm-stat-val">{data.s3}</span>
                <span className="tmm-stat-lab mono">{data.s3Lab}</span>
              </article>
            </div>
          ) : null}
        </div>
      </div>
      <footer className="tmm-foot">
        <div className="tmm-nav">
          <button
            type="button"
            className="tmm-nav-btn"
            aria-label="Предыдущий участник"
            onClick={() => go(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="tmm-nav-btn"
            aria-label="Следующий участник"
            onClick={() => go(1)}
          >
            ›
          </button>
        </div>
        <button
          type="button"
          className="tmm-cta mono"
          aria-expanded={detailOpen}
          onClick={() => setDetailOpen((v) => !v)}
        >
          {detailOpen ? "Краткое описание" : "Подробнее об опыте"}
        </button>
      </footer>
    </Modal>
  );
}
