export const gym = {
  instagram: 'https://www.instagram.com/knock_out_fitness/',
  facebook: 'https://www.facebook.com/KnockOutFitnessNj/',
  email: 'combatkickboxing27@yahoo.com',
  address: '2096 NJ-88, Brick, NJ 08724',
  directions: 'https://www.google.com/maps/search/?api=1&query=2096+NJ-88+Brick+NJ+08724',
};
export const pages = {
  index: {
    label: 'Home',
    title: 'Muay Thai & martial arts in Brick, NJ',
    description:
      'Muay Thai, kickboxing, grappling and personal training for adults and children at Knockout Fitness in Brick, New Jersey.',
  },
  coaches: {
    label: 'Coaches',
    title: 'Meet your coaches',
    description:
      'Meet Jim and Linda Walters, the coaches at Knockout Fitness in Brick, New Jersey.',
  },
  schedule: {
    label: 'Schedule',
    title: 'Find your next session',
    description:
      'Explore class information and contact Knockout Fitness to confirm your next Muay Thai, kickboxing or grappling session.',
  },
  photos: {
    label: 'Photos',
    title: 'Life on the mats',
    description:
      'Real training, real people. Explore photos from Knockout Fitness and follow @Knock_Out_Fitness on Instagram.',
  },
  location: {
    label: 'Visit us',
    title: 'Your next chapter starts here',
    description: 'Contact Knockout Fitness or find directions to 2096 NJ-88, Brick, NJ 08724.',
  },
};
export type Page = keyof typeof pages;
export const programs = [
  {
    id: 'muay-thai',
    name: 'Muay Thai',
    tag: 'THE ART OF EIGHT LIMBS',
    image: 'class-photos/image13.jpeg',
    text: 'Train your fists, elbows, knees and shins. Develop technique and conditioning through the striking art of Muay Thai.',
  },
  {
    id: 'children',
    name: 'Kids’ martial arts',
    tag: 'CONFIDENCE STARTS HERE',
    image: 'images/children_home.png',
    text: 'Build self-discipline, respect and confidence through movement, martial arts and learning together.',
  },
  {
    id: 'grappling',
    name: 'Grappling',
    tag: 'BUILD YOUR GROUND GAME',
    image: 'images/grappling_home.png',
    text: 'Learn position, control and close-contact techniques. Develop your skills on the mats, one session at a time.',
  },
  {
    id: 'fitness',
    name: 'Private training',
    tag: 'TIME DEDICATED TO YOU',
    image: 'images/28959287_1960160284057006_111231453873831936_n.jpg',
    text: 'One-on-one training that brings together conditioning, strength and martial arts. Talk to a coach about your goals.',
  },
  {
    id: 'sparring',
    name: 'Sparring',
    tag: 'PUT TECHNIQUE INTO PRACTICE',
    image: 'images/sparring_home.png',
    text: 'Develop timing, distance and judgment while putting your training into practice. Ask a coach which session is right for you.',
  },
];
export const coaches = [
  {
    name: 'Jim Walters',
    image: 'jim_profile_0525.jpg',
    role: 'MUAY THAI · MARTIAL ARTS',
    phone: '732-598-7167',
    text: 'Jim Walters began his martial arts journey in 1988 and has dedicated decades to mastering multiple disciplines. He holds black belts in both Muay Thai Kickboxing and Korean Combat Karate, showcasing his versatility and commitment to striking arts. Since 2013, Jim has been training in Brazilian Jiu-Jitsu and currently holds the rank of purple belt.',
  },
  {
    name: 'Linda Walters',
    image: 'linda.jpg',
    role: 'MUAY THAI · PERSONAL TRAINING',
    phone: '732-841-8886',
    text: 'Linda Walters is a 4th degree black belt in Muay Thai, blending power, precision, and decades of experience in the art of striking. A certified personal trainer through NASM, Linda has been helping clients transform their bodies and lives since 1993. Her deep knowledge of fitness and martial arts makes her a force both in the gym and on the mat.',
  },
];

// The source gallery intentionally has no image2.jpeg.
export const localPhotos = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((id, index) => ({
  id: `local-${id}`,
  imageUrl: `./media/class-photos/image${id}.jpeg`,
  permalink: `./media/class-photos/image${id}.jpeg`,
  caption: `A moment from training at Knockout Fitness — gym photo ${index + 1}`,
}));
