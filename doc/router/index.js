import Introduce from '../views/content/Introduce.md'
import Develop from '../views/content/Develop.md'
import CellSwipe from '../views/content/CellSwipe.md'
import Loading from '../views/content/Loading.md'
import Toast from '../views/content/Toast.md'
import XaxisScroll from '../views/content/XaxisScroll.md'
import YaxisScroll from '../views/content/YaxisScroll.md'
import Test from '../views/content/Test.md'

export const routes = [
  {
    path: '/Introduce',
    name: 'Introduce',
    component: Introduce
  },
  {
    path: '/Develop',
    name: 'Develop',
    component: Develop
  },
  {
    path: '/',
    redirect: '/Introduce'
  },
  {
    name: 'CellSwipe',
    path: '/CellSwipe',
    component: CellSwipe
  },
  {
    name: 'Loading',
    path: '/Loading',
    component: Loading
  },
  {
    name: 'Toast',
    path: '/Toast',
    component: Toast
  },
  {
    name: 'XaxisScroll',
    path: '/XaxisScroll',
    component: XaxisScroll
  },
  {
    name: 'YaxisScroll',
    path: '/YaxisScroll',
    component: YaxisScroll
  },
  {
    name: 'Test',
    path: '/Test',
    component: Test
  },
  
]
