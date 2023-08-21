import { FaTimesCircle } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi';
import { IoWarning } from 'react-icons/io5';
import { MdInfo } from 'react-icons/md';

const endpointMessageStyle = {
  INFO: 'border-blue-500/75 bg-blue-500/20',
  WARNING: 'border-orange-500/75 bg-orange-500/20',
  DANGER: 'border-red-500/75 bg-red-500/20',
  SUCCESS: 'border-green-500/75 bg-green-500/20',
};

const iconClass = 'w-6 h-6 absolute top-1/2 block -translate-y-1/2';
const endpointMessageIcon = {
  INFO: <MdInfo className={`text-blue-500 ${iconClass}`} />,
  WARNING: <IoWarning className={`text-orange-500 ${iconClass}`} />,
  DANGER: <FaTimesCircle className={`text-red-500 ${iconClass}`} />,
  SUCCESS: <HiCheckCircle className={`text-green-500 ${iconClass}`} />,
};

interface Props {
  type: 'SUCCESS' | 'DANGER' | 'WARNING' | 'INFO';
  text: string;
}

export default function Alert({ type, text }: Props) {
  return (
    <div
      className={`custom my-4 flex rounded-md border px-4 py-3 ${endpointMessageStyle[type]}`}
    >
      <div className="custom relative min-h-full min-w-6 max-w-6">
        {endpointMessageIcon[type]}
      </div>
      <p className="custom ml-2 block text-sm font-medium text-text">{text}</p>
    </div>
  );
}
