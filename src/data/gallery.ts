// Gallery photos. Files live in src/assets/photos/; Astro resizes them and
// serves WebP at build time, so drop in the original JPG and add a row here.
// Only photos the club has supplied or approved. Captions say only what the
// photo and a published source support; nothing about results the club hasn't confirmed.
// Originals and notes: 09_Club_Assets/Photos/ and its Photo_Log.md.
import type { ImageMetadata } from 'astro';
import chourjitCeremony from '../assets/photos/2026-02-chourjit-prize-ceremony.jpg';
import chourjitStage from '../assets/photos/2026-02-chourjit-stage-group.jpg';
import newVisionTeam from '../assets/photos/new-vision-team-trophy.jpg';
import newVisionPrize from '../assets/photos/new-vision-prize-presentation.jpg';
import gc2018Trophy from '../assets/photos/2018-03-governors-cup-trophy.jpg';
import gc2018Ground from '../assets/photos/2018-03-governors-cup-play-ground.jpg';
import gc2018Play from '../assets/photos/2018-03-governors-cup-play.jpg';
import gc2026Both from '../assets/photos/2026-02-governors-cup-men-and-women.jpg';
import gc2026Men from '../assets/photos/2026-02-governors-cup-men.jpg';
import gc2026Trophies from '../assets/photos/2026-02-governors-cup-two-trophies.jpg';
import gc2026Pair from '../assets/photos/2026-02-governors-cup-two-players.jpg';

export type Photo = {
  src: ImageMetadata;
  alt: string;       // what is in the picture, for screen readers
  caption: string;   // shown under the photo
  when: string;      // display date; leave '' if not known
};

export const photos: Photo[] = [
  {
    src: gc2026Both,
    alt: 'The men’s side in white standing and the women’s side in light blue kneeling in front, holding two trophies, with the Mapal Kangjeibung scoreboard behind.',
    caption: 'The men’s and women’s sides with both Governor’s Cup trophies at Mapal Kangjeibung, after winning both finals on the same afternoon.',
    when: 'Feb 2026',
  },
  {
    src: gc2026Men,
    alt: 'Six players in white polo kit hold up a trophy together on the ground, with tournament banners behind.',
    caption: 'The men’s side with the 32nd Governor’s Cup Invitation trophy, after the 7–6 final against X-Polo Club.',
    when: 'Feb 2026',
  },
  {
    src: gc2026Trophies,
    alt: 'A player in white and a player in light blue each hold a trophy topped with a polo rider, in front of the tournament banners.',
    caption: 'Two of the club’s players with Governor’s Cup trophies, Mapal Kangjeibung.',
    when: 'Feb 2026',
  },
  {
    src: gc2026Pair,
    alt: 'Two players in white polo kit hold a trophy between them, below the scoreboard and the 32nd Governor’s Cup banner.',
    caption: 'Two of the club’s players with the Governor’s Cup Invitation trophy.',
    when: 'Feb 2026',
  },
  {
    src: chourjitCeremony,
    alt: 'Club players in white polo kit receive a trophy from an official in front of the tournament backdrop.',
    caption: 'Prize ceremony, 2nd Dr Ksh. Chourjit Singh Inter-District Polo Tournament, Mapal Kangjeibung. The club finished runners-up.',
    when: 'Feb 2026',
  },
  {
    src: chourjitStage,
    alt: 'The team in white, seated and kneeling with the trophy, with guests and officials on the stage behind them.',
    caption: 'With the guests and officials after the final of the 2nd Dr Ksh. Chourjit Singh Inter-District Polo Tournament.',
    when: 'Feb 2026',
  },
  {
    src: newVisionTeam,
    alt: 'Players in red and white jerseys with a trophy and certificate on the grass, with young riders and supporters behind.',
    caption: 'The team with its trophy and certificate at the 1st New Vision Men’s Open Champion Polo Tournament.',
    when: '',   // year to confirm with the club
  },
  {
    src: newVisionPrize,
    alt: 'Guests hand a trophy and certificate to players in red jerseys under a decorated tent.',
    caption: 'Prize presentation at the New Vision Open Champion Polo Tournament.',
    when: '',   // year to confirm with the club
  },
  {
    src: gc2018Trophy,
    alt: 'Players in red shirts hold up the Governor’s Cup trophy on the presentation stage.',
    caption: 'With the trophy at the 28th Governor’s Cup Invitation Polo Tournament, Mapal Kangjeibung. The club won the 2018 Governor’s Cup.',
    when: 'Mar 2018',
  },
  {
    src: gc2018Play,
    alt: 'Riders in red and yellow chase the ball across the ground, with flags and trees behind.',
    caption: 'Match play at Mapal Kangjeibung during the 28th Governor’s Cup.',
    when: 'Mar 2018',
  },
  {
    src: gc2018Ground,
    alt: 'Riders in red and yellow gallop past the scoreboard and banners at Mapal Kangjeibung.',
    caption: 'A chukker at Mapal Kangjeibung, 28th Governor’s Cup.',
    when: 'Mar 2018',
  },
];
