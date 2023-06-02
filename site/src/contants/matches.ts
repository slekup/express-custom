import {
  BiHomeAlt,
  BiImageAlt,
  BiLockAlt,
  BiTestTube,
  BiWorld,
} from 'react-icons/bi';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { ImInfo } from 'react-icons/im';
import { IconType } from 'react-icons/lib';
import { MdOutlinePayment, MdQuestionMark } from 'react-icons/md';
import { RiAdminLine, RiUserLine } from 'react-icons/ri';
import { TbCode } from 'react-icons/tb';

const matches: [string[], IconType][] = [
  [['home', 'main', 'primary'], BiHomeAlt],
  [['github'], FaGithub],
  [
    [
      'science',
      'test',
      'testing',
      'data',
      'analytics',
      'stats',
      'track',
      'experiment',
    ],
    BiTestTube,
  ],
  [['media', 'image', 'video'], BiImageAlt],
  [['admin'], RiAdminLine],
  [['info', 'alert'], ImInfo],
  [['payment', 'billing', 'subscription'], MdOutlinePayment],
  [['auth', 'login', 'register', 'private', 'security', 'protect'], BiLockAlt],
  [['developer', 'dev', 'api', 'code'], TbCode],
  [['random', 'question', 'unknown', 'never', 'answer'], MdQuestionMark],
  [
    ['custom', 'doc', 'blog', 'coverage', 'write', 'paper'],
    HiOutlineDocumentText,
  ],
  [['user', 'person', 'people', 'human', 'account'], RiUserLine],
  [['public', 'global', 'open', 'free', 'world'], BiWorld],
];

export default matches;
