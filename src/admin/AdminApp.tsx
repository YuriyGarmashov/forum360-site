import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import {
  deleteMedia,
  getAdminContent,
  getSession,
  loginAdmin,
  logoutAdmin,
  saveAdminContent,
  uploadMedia,
  type AdminSession,
} from "@/admin/adminApi";
import {
  editableTextToHtml,
  htmlToEditableText,
  moveItem,
  slugify,
  splitParagraphs,
} from "@/admin/adminUtils";
import { applyRussianTypography } from "@/content/typography";
import { mergeContent } from "@/context/contentContext";
import type { Case, CaseId, CasePhoto } from "@/types/case";
import type { SiteContent } from "@/types/content";
import type { Member, MemberId } from "@/types/member";

type AdminTab = "general" | "team" | "cases";
type StatusKind = "idle" | "success" | "error" | "saving" | "loading";

const TABS: { id: AdminTab; label: string }[] = [
  { id: "general", label: "Общие блоки" },
  { id: "team", label: "Команда" },
  { id: "cases", label: "Кейсы и фото" },
];

const EMPTY_CASE: Case = {
  title: "Новый кейс",
  meta: "Заказчик · город",
  body: "<p>Короткое описание проекта.</p>",
  bodyDetail: "<p>Подробное описание проекта.</p>",
  eis: "",
};

export function AdminApp() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [status, setStatus] = useState("Проверяем вход...");

  useEffect(() => {
    getSession()
      .then(setSession)
      .catch(() => setSession({ authenticated: false, username: null }))
      .finally(() => setStatus(""));
  }, []);

  if (!session) {
    return <AdminShellMessage text={status || "Загружаем админку..."} />;
  }

  if (!session.authenticated) {
    return <LoginScreen onLogin={setSession} />;
  }

  return <AdminWorkspace username={session.username ?? "admin"} onLogout={setSession} />;
}

function AdminShellMessage({ text }: { text: string }) {
  return (
    <main className="admin-page">
      <section className="admin-card admin-card--center">
        <p>{text}</p>
      </section>
    </main>
  );
}

function LoginScreen({ onLogin }: { onLogin: (session: AdminSession) => void }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const next = await loginAdmin(username, password);
      onLogin(next);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось войти.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="admin-page admin-page--login">
      <form className="admin-login" onSubmit={submit}>
        <div className="admin-login-mark mono" aria-hidden="true">
          360
        </div>
        <p className="admin-kicker mono">FORUM 360 CMS</p>
        <h1>Вход в админку</h1>
        <p className="admin-muted admin-login-copy">
          Логин администратора: admin. Пароль хранится на сервере в защищённом виде.
        </p>
        <label className="admin-field">
          <span>Логин</span>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className="admin-field">
          <span>Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {message ? <p className="admin-alert admin-alert--error">{message}</p> : null}
        <button className="admin-btn admin-btn--primary" disabled={busy}>
          {busy ? "Входим..." : "Войти"}
        </button>
      </form>
    </main>
  );
}

function AdminWorkspace({
  username,
  onLogout,
}: {
  username: string;
  onLogout: (session: AdminSession) => void;
}) {
  const [activeTab, setActiveTab] = useState<AdminTab>("general");
  const [saved, setSaved] = useState<SiteContent | null>(null);
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [statusKind, setStatusKind] = useState<StatusKind>("loading");
  const [message, setMessage] = useState("Загружаем контент...");

  useEffect(() => {
    getAdminContent()
      .then((data) => {
        const normalized = mergeContent(data);
        setSaved(normalized);
        setDraft(normalized);
        setStatusKind("idle");
        setMessage("");
      })
      .catch((error) => {
        setStatusKind("error");
        setMessage(error instanceof Error ? error.message : "Не удалось загрузить контент.");
      });
  }, []);

  const dirty = useMemo(
    () => Boolean(saved && draft && JSON.stringify(saved) !== JSON.stringify(draft)),
    [saved, draft],
  );

  const save = async () => {
    if (!draft) return;
    setStatusKind("saving");
    setMessage("Сохраняем...");
    try {
      const savedContent = mergeContent(await saveAdminContent(applyRussianTypography(draft)));
      setSaved(savedContent);
      setDraft(savedContent);
      setStatusKind("success");
      setMessage("Изменения сохранены и уже видны на сайте.");
    } catch (error) {
      setStatusKind("error");
      setMessage(error instanceof Error ? error.message : "Не удалось сохранить.");
    }
  };

  const logout = async () => {
    await logoutAdmin();
    onLogout({ authenticated: false, username: null });
  };

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-topbar">
          <div>
            <p className="admin-kicker mono">FORUM 360 CMS</p>
            <h1>Управление сайтом</h1>
          </div>
          <div className="admin-user">
            <span className="mono">{username}</span>
            <button className="admin-btn admin-btn--dark" type="button" onClick={logout}>
              Выйти
            </button>
          </div>
        </header>

        <div className="admin-controlbar">
          <nav className="admin-tabs" aria-label="Разделы админки">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={activeTab === tab.id ? "is-active" : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="admin-actions">
            <StatusMessage kind={statusKind} message={message} dirty={dirty} />
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              disabled={!draft || statusKind === "saving" || !dirty}
              onClick={save}
            >
              Сохранить изменения
            </button>
          </div>
        </div>

        {!draft ? (
          <section className="admin-card">
            <p>{message}</p>
          </section>
        ) : (
          <>
            {activeTab === "general" ? (
              <GeneralEditor draft={draft} setDraft={setDraft} />
            ) : null}
            {activeTab === "team" ? (
              <TeamEditor draft={draft} setDraft={setDraft} />
            ) : null}
            {activeTab === "cases" ? (
              <CasesEditor draft={draft} setDraft={setDraft} setMessage={setMessage} />
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}

function StatusMessage({
  kind,
  message,
  dirty,
}: {
  kind: StatusKind;
  message: string;
  dirty: boolean;
}) {
  const text = message || (dirty ? "Есть несохранённые изменения." : "Всё сохранено.");
  return <p className={`admin-status admin-status--${kind}`}>{text}</p>;
}

function GeneralEditor({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: Dispatch<SetStateAction<SiteContent | null>>;
}) {
  const update = (recipe: (content: SiteContent) => SiteContent) => {
    setDraft((prev) => (prev ? recipe(prev) : prev));
  };

  return (
    <section className="admin-grid">
      <article className="admin-card">
        <h2>Hero</h2>
        <TextField
          label="Текст под логотипом"
          value={draft.hero.tagline}
          onChange={(value) =>
            update((content) => ({ ...content, hero: { ...content.hero, tagline: value } }))
          }
        />
        <TextField
          label="Заголовок карточки этапов"
          value={draft.hero.processTitle}
          onChange={(value) =>
            update((content) => ({
              ...content,
              hero: { ...content.hero, processTitle: value },
            }))
          }
        />
        <TextAreaField
          label="Этапы проекта"
          hint="Один пункт на строку."
          value={draft.hero.processSteps.join("\n")}
          rows={4}
          onChange={(value) =>
            update((content) => ({
              ...content,
              hero: {
                ...content.hero,
                processSteps: value.split("\n").map((line) => line.trim()).filter(Boolean),
              },
            }))
          }
        />
        <div className="admin-two-cols">
          <TextField
            label="Левая подпись"
            value={draft.hero.metricLeftLabel}
            onChange={(value) =>
              update((content) => ({
                ...content,
                hero: { ...content.hero, metricLeftLabel: value },
              }))
            }
          />
          <TextField
            label="Левое число"
            value={draft.hero.metricLeftValue}
            onChange={(value) =>
              update((content) => ({
                ...content,
                hero: { ...content.hero, metricLeftValue: value },
              }))
            }
          />
          <TextField
            label="Правая подпись"
            value={draft.hero.metricRightLabel}
            onChange={(value) =>
              update((content) => ({
                ...content,
                hero: { ...content.hero, metricRightLabel: value },
              }))
            }
          />
          <TextField
            label="Правое число"
            value={draft.hero.metricRightValue}
            onChange={(value) =>
              update((content) => ({
                ...content,
                hero: { ...content.hero, metricRightValue: value },
              }))
            }
          />
        </div>
      </article>

      <article className="admin-card">
        <h2>О компании</h2>
        <TextField
          label="Заголовок"
          value={draft.about.title}
          onChange={(value) =>
            update((content) => ({ ...content, about: { ...content.about, title: value } }))
          }
        />
        <TextAreaField
          label="Текст"
          hint="Абзацы отделяются пустой строкой."
          value={draft.about.paragraphs.join("\n\n")}
          rows={10}
          onChange={(value) =>
            update((content) => ({
              ...content,
              about: { ...content.about, paragraphs: splitParagraphs(value) },
            }))
          }
        />
        <TextField
          label="Кнопка"
          value={draft.about.ctaText}
          onChange={(value) =>
            update((content) => ({ ...content, about: { ...content.about, ctaText: value } }))
          }
        />
      </article>

      <article className="admin-card">
        <h2>Подвал и контакты</h2>
        <TextField
          label="Бренд"
          value={draft.footer.brand}
          onChange={(value) =>
            update((content) => ({ ...content, footer: { ...content.footer, brand: value } }))
          }
        />
        <TextAreaField
          label="Описание"
          value={draft.footer.description}
          rows={3}
          onChange={(value) =>
            update((content) => ({
              ...content,
              footer: { ...content.footer, description: value },
            }))
          }
        />
        <div className="admin-two-cols">
          <TextField
            label="Телефон"
            value={draft.footer.phone}
            onChange={(value) =>
              update((content) => ({ ...content, footer: { ...content.footer, phone: value } }))
            }
          />
          <TextField
            label="Email"
            value={draft.footer.email}
            onChange={(value) =>
              update((content) => ({ ...content, footer: { ...content.footer, email: value } }))
            }
          />
        </div>
        <TextField
          label="Юр. лицо"
          value={draft.footer.legalName}
          onChange={(value) =>
            update((content) => ({
              ...content,
              footer: { ...content.footer, legalName: value },
            }))
          }
        />
        <TextField
          label="ИНН"
          value={draft.footer.inn}
          onChange={(value) =>
            update((content) => ({ ...content, footer: { ...content.footer, inn: value } }))
          }
        />
        <TextAreaField
          label="Адрес"
          value={draft.footer.address}
          rows={3}
          onChange={(value) =>
            update((content) => ({ ...content, footer: { ...content.footer, address: value } }))
          }
        />
      </article>
    </section>
  );
}

function TeamEditor({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: Dispatch<SetStateAction<SiteContent | null>>;
}) {
  const [selectedId, setSelectedId] = useState<MemberId>(draft.team.memberOrder[0]);
  const selected = draft.team.members[selectedId];

  const update = (recipe: (content: SiteContent) => SiteContent) => {
    setDraft((prev) => (prev ? recipe(prev) : prev));
  };

  const updateMember = (patch: Partial<Member>) => {
    update((content) => ({
      ...content,
      team: {
        ...content.team,
        members: {
          ...content.team.members,
          [selectedId]: {
            ...content.team.members[selectedId],
            ...patch,
          },
        },
      },
    }));
  };

  return (
    <section className="admin-grid admin-grid--sidebar">
      <article className="admin-card">
        <h2>Блок команды</h2>
        <TextField
          label="Заголовок"
          value={draft.team.title}
          onChange={(value) =>
            update((content) => ({ ...content, team: { ...content.team, title: value } }))
          }
        />
        <TextAreaField
          label="Подзаголовок"
          value={draft.team.tagline}
          rows={3}
          onChange={(value) =>
            update((content) => ({ ...content, team: { ...content.team, tagline: value } }))
          }
        />
        <div className="admin-list-nav">
          {draft.team.memberOrder.map((id) => (
            <button
              key={id}
              type="button"
              className={selectedId === id ? "is-active" : ""}
              onClick={() => setSelectedId(id)}
            >
              {draft.team.members[id]?.name ?? id}
            </button>
          ))}
        </div>
      </article>

      <article className="admin-card">
        <h2>{selected?.name ?? "Участник"}</h2>
        {selected ? (
          <>
            <TextField label="Имя" value={selected.name} onChange={(value) => updateMember({ name: value })} />
            <TextField label="Должность" value={selected.role} onChange={(value) => updateMember({ role: value })} />
            <TextAreaField label="Краткое описание" value={selected.desc} rows={7} onChange={(value) => updateMember({ desc: value })} />
            <div className="admin-two-cols admin-two-cols--stats">
              <TextField label="Опыт" value={selected.s1} onChange={(value) => updateMember({ s1: value })} />
              <TextField label="Метрика 2" value={selected.s2} onChange={(value) => updateMember({ s2: value })} />
              <TextField label="Подпись 2" value={selected.s2Lab} onChange={(value) => updateMember({ s2Lab: value })} />
              <TextField label="Метрика 3" value={selected.s3} onChange={(value) => updateMember({ s3: value })} />
              <TextField label="Подпись 3" value={selected.s3Lab} onChange={(value) => updateMember({ s3Lab: value })} />
            </div>
            <TextAreaField label="Подробный опыт" value={selected.experience} rows={14} onChange={(value) => updateMember({ experience: value })} />
          </>
        ) : null}
      </article>
    </section>
  );
}

function CasesEditor({
  draft,
  setDraft,
  setMessage,
}: {
  draft: SiteContent;
  setDraft: Dispatch<SetStateAction<SiteContent | null>>;
  setMessage: Dispatch<SetStateAction<string>>;
}) {
  const [selectedId, setSelectedId] = useState<CaseId>(draft.cases.caseOrder[0]);
  const [dragPhotoId, setDragPhotoId] = useState<string | null>(null);
  const selectedCase = draft.cases.items[selectedId];
  const photos = draft.cases.photos[selectedId] ?? [];

  const update = (recipe: (content: SiteContent) => SiteContent) => {
    setDraft((prev) => (prev ? recipe(prev) : prev));
  };

  const updateCase = (patch: Partial<Case>) => {
    update((content) => ({
      ...content,
      cases: {
        ...content.cases,
        items: {
          ...content.cases.items,
          [selectedId]: {
            ...content.cases.items[selectedId],
            ...patch,
          },
        },
      },
    }));
  };

  const updatePhotos = (nextPhotos: CasePhoto[]) => {
    update((content) => ({
      ...content,
      cases: {
        ...content.cases,
        photos: {
          ...content.cases.photos,
          [selectedId]: nextPhotos,
        },
      },
    }));
  };

  const addCase = () => {
    const idBase = slugify("novyy-key") || "case";
    const id = `${idBase}-${Date.now()}`;
    update((content) => ({
      ...content,
      cases: {
        ...content.cases,
        caseOrder: [...content.cases.caseOrder, id],
        items: { ...content.cases.items, [id]: EMPTY_CASE },
        photos: { ...content.cases.photos, [id]: [] },
      },
    }));
    setSelectedId(id);
  };

  const removeCase = () => {
    if (!selectedCase || !window.confirm("Удалить кейс из сайта?")) return;
    const nextId = draft.cases.caseOrder.find((id) => id !== selectedId) ?? "";
    update((content) => {
      const nextItems = { ...content.cases.items };
      const nextPhotos = { ...content.cases.photos };
      delete nextItems[selectedId];
      delete nextPhotos[selectedId];
      return {
        ...content,
        cases: {
          ...content.cases,
          caseOrder: content.cases.caseOrder.filter((id) => id !== selectedId),
          items: nextItems,
          photos: nextPhotos,
        },
      };
    });
    setSelectedId(nextId);
  };

  const uploadFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;

    setMessage("Загружаем фотографии...");
    const uploaded: CasePhoto[] = [];
    for (const file of files) {
      uploaded.push(await uploadMedia(selectedId, file, selectedCase?.title ?? ""));
    }
    updatePhotos([...photos, ...uploaded]);
    setMessage("Фотографии загружены. Не забудь сохранить изменения.");
  };

  const removePhoto = async (photo: CasePhoto) => {
    if (!window.confirm("Убрать фото из галереи?")) return;
    if (photo.src.startsWith("/uploads/")) {
      await deleteMedia(photo.src);
    }
    updatePhotos(photos.filter((item) => item.id !== photo.id));
  };

  const reorderCase = (from: number, to: number) => {
    update((content) => ({
      ...content,
      cases: {
        ...content.cases,
        caseOrder: moveItem(content.cases.caseOrder, from, to),
      },
    }));
  };

  return (
    <section className="admin-grid admin-grid--sidebar">
      <article className="admin-card">
        <h2>Кейсы</h2>
        <TextField
          label="Заголовок секции"
          value={draft.cases.title}
          onChange={(value) =>
            update((content) => ({ ...content, cases: { ...content.cases, title: value } }))
          }
        />
        <div className="admin-list-nav">
          {draft.cases.caseOrder.map((id, index) => (
            <div className="admin-list-row" key={id}>
              <button
                type="button"
                className={selectedId === id ? "is-active" : ""}
                onClick={() => setSelectedId(id)}
              >
                {draft.cases.items[id]?.title ?? id}
              </button>
              <div className="admin-row-actions">
                <button type="button" onClick={() => reorderCase(index, index - 1)}>
                  ↑
                </button>
                <button type="button" onClick={() => reorderCase(index, index + 1)}>
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="admin-btn" type="button" onClick={addCase}>
          Добавить кейс
        </button>
      </article>

      <article className="admin-card">
        {selectedCase ? (
          <>
            <div className="admin-card-head">
              <h2>Редактирование кейса</h2>
              <button className="admin-btn admin-btn--danger" type="button" onClick={removeCase}>
                Удалить кейс
              </button>
            </div>
            <TextField label="Название" value={selectedCase.title} onChange={(value) => updateCase({ title: value })} />
            <TextField label="Локация / заказчик" value={selectedCase.meta} onChange={(value) => updateCase({ meta: value })} />
            <TextField label="Ссылка ЕИС" value={selectedCase.eis} onChange={(value) => updateCase({ eis: value })} />
            <TextAreaField
              label="Короткое описание"
              hint="Абзацы отделяются пустой строкой."
              value={htmlToEditableText(selectedCase.body)}
              rows={6}
              onChange={(value) => updateCase({ body: editableTextToHtml(value) })}
            />
            <TextAreaField
              label="Подробное описание"
              hint="Абзацы отделяются пустой строкой."
              value={htmlToEditableText(selectedCase.bodyDetail)}
              rows={10}
              onChange={(value) => updateCase({ bodyDetail: editableTextToHtml(value) })}
            />

            <div className="admin-media-head">
              <div>
                <h3>Фотографии</h3>
                <p className="admin-muted">Перетаскивайте карточки или используйте стрелки.</p>
              </div>
              <label className="admin-upload">
                Загрузить фото
                <input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={uploadFiles} />
              </label>
            </div>
            <div className="admin-photo-grid">
              {photos.map((photo, index) => (
                <article
                  key={photo.id}
                  className="admin-photo"
                  draggable
                  onDragStart={() => setDragPhotoId(photo.id)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => {
                    const from = photos.findIndex((item) => item.id === dragPhotoId);
                    updatePhotos(moveItem(photos, from, index));
                    setDragPhotoId(null);
                  }}
                >
                  <img src={photo.src} alt="" loading="lazy" />
                  <TextField
                    label={`Alt ${index + 1}`}
                    value={photo.alt ?? ""}
                    onChange={(value) =>
                      updatePhotos(
                        photos.map((item) =>
                          item.id === photo.id ? { ...item, alt: value } : item,
                        ),
                      )
                    }
                  />
                  <div className="admin-row-actions">
                    <button type="button" onClick={() => updatePhotos(moveItem(photos, index, index - 1))}>
                      ↑
                    </button>
                    <button type="button" onClick={() => updatePhotos(moveItem(photos, index, index + 1))}>
                      ↓
                    </button>
                    <button type="button" onClick={() => removePhoto(photo)}>
                      Убрать
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p>Выберите кейс или добавьте новый.</p>
        )}
      </article>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function TextAreaField({
  label,
  hint,
  value,
  rows = 5,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  rows?: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {hint ? <small>{hint}</small> : null}
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
