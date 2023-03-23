import qlnsImg from '@/assets/images/qlns.png';
import mckdImg from '@/assets/images/mckd.png';
import dmclImg from '@/assets/images/dmcl.png';
import qlksImg from '@/assets/images/qlks.png';
import ctsvImg from '@/assets/images/ctsv.png';
import eofficeImg from '@/assets/images/eoffice.png';
import cdioImg from '@/assets/images/cdio.png';
import qldtImg from '@/assets/images/qldt.png';
import xtImg from '@/assets/images/xt.png';
import xtAdminImg from '@/assets/images/xtAdmin.png';
import qlnckhImg from '@/assets/images/qlnckh.png';
import qltvImg from '@/assets/images/qltv.png';
import appSVImg from '@/assets/images/app-sv.png';
import appPHImg from '@/assets/images/app-ph.png';
import appNVImg from '@/assets/images/app-nv.png';

export interface SystemCard {
  imageUrl: string;
  id: number;
}
export interface SystemGroupColor {
  color: string;
  id: number;
}

export const SYSTEM_CARD_IMAGES: SystemCard[] = [
  {
    id: 1,
    imageUrl: qlnsImg
  },
  {
    id: 2,
    imageUrl: mckdImg
  },
  {
    id: 0,
    imageUrl: dmclImg
  },
  {
    id: 0,
    imageUrl: qlksImg
  },
  {
    id: 0,
    imageUrl: ctsvImg
  },
  {
    id: 0,
    imageUrl: eofficeImg
  },
  {
    id: 0,
    imageUrl: cdioImg
  },
  {
    id: 0,
    imageUrl: qldtImg
  },
  {
    id: 3,
    imageUrl: xtImg
  },
  {
    id: 4,
    imageUrl: xtAdminImg
  },
  {
    id: 0,
    imageUrl: qlnckhImg
  },
  {
    id: 0,
    imageUrl: qltvImg
  },
  {
    id: 0,
    imageUrl: appSVImg
  },
  {
    id: 0,
    imageUrl: appPHImg
  },
  {
    id: 0,
    imageUrl: appNVImg
  }
];

export const SYSTEM_GROUP_COLOR: SystemGroupColor[] = [
  {
    id: 1,
    color: 'rgba(38, 103, 240, 1)'
  },
  {
    id: 2,
    color: 'rgba(220, 87, 87, 1)'
  },
  {
    id: 3,
    color: 'rgba(133, 100, 50, 1)'
  }
];
