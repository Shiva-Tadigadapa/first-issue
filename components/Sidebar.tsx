import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

import { useAppData } from "../hooks/useAppData";
import { AboutSection } from "./AboutSection";
import { LinkButton } from "./Button/LinkButton";
import { NewsletterSection } from "./NewsletterSection";
import { LanguagePicker } from "./Picker/LanguagePicker";
import { TagPicker } from "./Picker/TagPicker";

export const Sidebar = () => {
  const router = useRouter();
  const { languages, tags } = useAppData();
  const { tag: activeTagId } = router.query;
  const pageName = router.pathname.split("/")[1];

  return (
    <section className="w-full flex-none px-6  text-light-300 md:max-w-sm">
      <AboutSection />
      <LinkButton href="https://github.com/lucavallin/first-issue" secondary>
        <FontAwesomeIcon icon={faGithub} className="mr-2" />
        Star it on GitHub 🌟
      </LinkButton>
      <LinkButton href="https://github.com/lucavallin/first-issue#adding-a-new-project">
        Add your project
      </LinkButton>
      <LanguagePicker
        languages={languages}
        activeTagId={activeTagId}
        onLanguagePage={pageName == "language"}
      />
      <TagPicker tags={tags} activeTagId={activeTagId} onTagPage={pageName == "tag"} />
      <NewsletterSection />
    </section>
  );
};
