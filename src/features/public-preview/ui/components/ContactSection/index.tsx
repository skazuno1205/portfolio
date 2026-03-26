import { contactLinks } from "../../../model/portfolioData";
import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section className={baseStyles.section} id="save-point">
      <div
        className={cn(styles.savePoint, baseStyles.panel, baseStyles.reveal)}
      >
        <div>
          <p className={baseStyles.sectionHeadingEyebrow}>SAVE POINT</p>
          <h2>Contact / Continue?</h2>
          <p>
            現場で稼働するシステムの開発を軸に、自動運転領域のフロントエンド・ハードウェアを横断しながら設計・実装・運用改善を一貫して推進。あわせて、kutsulabではCTOとしてEC開発・運用やプロダクト改善にも取り組んでいます。
          </p>
        </div>
        <div className={styles.savePointCard}>
          <p>
            <span>NAME</span> 数野 翔太
          </p>
          <p>
            <span>ROLE</span> Frontend / Hardware / kutsulab CTO
          </p>
          <p>
            <span>STATUS</span> READY TO CONTINUE
          </p>
          {contactLinks.map((link) => (
            <a
              key={link.label}
              className={cn(
                baseStyles.pixelBtn,
                baseStyles.pixelBtnContact,
                styles.contactButton,
              )}
              href={link.href}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
