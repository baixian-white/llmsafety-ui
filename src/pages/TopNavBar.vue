<template>
    <header ref="navbar" :class="['fixed top-0 rounded-b-lg md:rounded-b-none left-0 right-0 z-50 bg-transparent backdrop-blur-md transition-all duration-300', { 'navbar-hidden': isNavbarHidden || isNavbarManuallyHidden, 'navbar-manually-hidden': isNavbarManuallyHidden }]">
        <div class="container mx-auto flex h-14 items-center justify-between px-4">
            <a href="/" class="flex h-8 items-center min-w-0 mr-3">
                <!-- 用相对路径引用图片 -->
                <img src="../assets/logo.png" alt="Logo" class="size-8 mr-2 shrink-0" />

                <span class="text-base sm:text-xl xl:text-2xl font-medium text-purple font-sans truncate">
                     <span class="text-primary">大模型安全交互式教学平台</span>
                </span>
            </a>
            <NavigationMenu class="hidden xl:block">
                <NavigationMenuList>
                    <NavigationMenuItem v-for="(item, index) in navItems" :key="index">
                        <template v-if="item.children && item.children.length">
                            <NavigationMenuTrigger
                                class="px-2 hover:bg-transparent! hover:text-purple! text-md font-medium bg-transparent dark:bg-transparent"
                                @mouseenter="item.hover = true" @mouseleave="item.hover = false">
                                {{ item.title }}
                                <IconMenuToClose v-if="item.hover" class="ml-1 size-5" />
                                <IconCloseToMenu v-else class="ml-1 size-5" />
                            </NavigationMenuTrigger>
                            <NavigationMenuContent class="right:0 w-42 absolute top-full" as-child>
                                <Card class="rounded-sm mt-2">
                                    <ul class="w-40">
                                        <li v-for="child, key in item.children" :key="key"
                                            @mouseenter="child.hover = true" @mouseleave="child.hover = false">
                                            <NavigationMenuLink class="group/link font-medium text-md" as-child>
                                                <RouterLink :to="child.href"
                                                    class="hover:text-purple flex items-center justify-start flex-row">
                                                    {{ child.title }}
                                                    <IconExternalLink v-if="child.hover"
                                                        class="group-active/link:text-primary size-5 shrink-0" />
                                                </RouterLink>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </Card>
                            </NavigationMenuContent>
                        </template>
                        <template v-else>
                            <NavigationMenuLink as-child class="text-md">
                                <RouterLink :to="item.href"
                                    class="group/link items-center flex-row flex-shrink-0 hover:text-purple hover:bg-transparent dark:hover:bg-transparent font-medium p-2 rounded-md">
                                    {{ item.title }}
                                    <IconExternalLink class="group-active/link:text-primary size-5" />
                                </RouterLink>
                            </NavigationMenuLink>
                        </template>
                    </NavigationMenuItem>
                </NavigationMenuList>

            </NavigationMenu>

            <!-- 右侧工具按钮：各断点都保留，避免收成汉堡菜单后丢失 -->
            <div class="flex items-center gap-1 shrink-0">
                <Button @click="toggleDark()" variant="ghost" size="icon"
                    class=" bg-transparent dark:bg-transparent hover:bg-accent hover:text-purple dark:text-foreground dark:hover:bg-background dark:hover:text-purple">
                    <Sun class="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon class="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span class="sr-only">切换主题</span>
                </Button>
                <Button @click="toggleNavbarVisibility" variant="ghost" size="icon"
                    class=" bg-transparent dark:bg-transparent hover:bg-accent hover:text-purple dark:text-foreground dark:hover:bg-background dark:hover:text-purple">
                    <Maximize class="size-4" />
                    <span class="sr-only">隐藏导航栏</span>
                </Button>

                <!-- 窄屏汉堡按钮：桌面导航放不下时（< xl）才出现 -->
                <button class="xl:hidden p-2" @click="isOpen = !isOpen">
                    <IconMenuToClose v-if="isOpen" class="size-5" />
                    <IconCloseToMenu v-else class="size-5" />
                </button>
            </div>
        </div>
        <transition name="menu-fade">
            <div v-if="isOpen" class="xl:hidden rounded-b-lg relative w-full shadow-primary/10 shadow-lg overflow-hidden"
                style="top: 100%;">
                <ul class="flex flex-col p-4 space-y-1">
                    <li v-for="(item, index) in navItems" :key="index">
                        <div>
                            <div @click="item.open = !item.open"
                                class="w-full flex justify-between items-center p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors duration-200">
                                <RouterLink :to="item.href"
                                    class="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                                    {{ item.title }}
                                    <IconExternalLink v-if="!item.children" class="size-5" />
                                </RouterLink>
                                <!-- 如果有子菜单，则显示展开/收起按钮 -->
                                <button v-if="item.children"
                                    class="p-1 rounded-full hover:bg-purple-100 dark:hover:bg-slate-700">
                                    <IconMenuToClose v-if="item.open" class="size-5" />
                                    <IconCloseToMenu v-else class="size-5" />

                                </button>
                            </div>

                            <!-- 子菜单 -->
                            <div v-if="item.children" :class="['submenu-wrapper', { 'open': item.open }]">
                                <ul class="submenu pl-3 space-y-1">
                                    <li v-for="(child, key) in item.children" :key="key">
                                        <RouterLink :to="child.href"
                                            class="flex items-center gap-1 p-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                                            {{ child.title }}
                                            <IconExternalLink class="size-5" />
                                        </RouterLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <!-- 分割线 -->
                    <li class="px-5">
                        <hr class="my-2 border-slate-200 dark:border-slate-700" />
                    </li>
                    <!-- 切换主题按钮 -->
                    <li>
                        <button @click="toggleDark()"
                            class="w-full flex items-center justify-center pt-1 rounded-lg font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200">
                            <Moon v-if="isDark" class="mr-2 size-4" />
                            <Sun v-else class="mr-2 size-4" />
                            切换主题
                        </button>
                    </li>
                </ul>
            </div>
        </transition>
    </header>
    <Button v-if="isNavbarManuallyHidden" @click="toggleNavbarVisibility" variant="ghost" size="icon"
        class="inline-flex fixed top-2 right-4 z-[60] bg-background/80 backdrop-blur-md shadow-md hover:bg-accent hover:text-purple">
        <Minimize class="size-4" />
        <span class="sr-only">显示导航栏</span>
    </Button>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
    NavigationMenuTrigger,
    NavigationMenuContent
} from '@/components/ui/navigation-menu'
import { Card } from '@/components/ui/card'
import IconExternalLink from '@/components/icons/icon-external-link.vue'
import IconMenuToClose from '@/components/icons/icon-menu-to-close.vue'
import IconCloseToMenu from '@/components/icons/icon-close-to-menu.vue'
import { Maximize, Minimize, Moon, Sun } from 'lucide-vue-next'

interface NavItem {
    title: string
    href: string
    hover?: boolean
    children?: NavItem[]
    open?: boolean
}

const isDark = useDark()
const isOpen = ref(false)
const toggleDark = useToggle(isDark)

const navbar = ref<HTMLElement | null>(null)
const isNavbarHidden = ref(false)
const isNavbarManuallyHidden = ref(false)
const toggleNavbarVisibility = () => {
    isNavbarManuallyHidden.value = !isNavbarManuallyHidden.value
}
let lastScrollY = window.scrollY

const handleScroll = () => {
    if (!navbar.value) return
    // 背景透明/半透明切换
    if (window.scrollY > 50) {
        navbar.value.classList.remove('bg-transparent')
        navbar.value.classList.add('bg-background/60')
    } else {
        navbar.value.classList.remove('bg-background/60')
        navbar.value.classList.add('bg-transparent')
    }
    // 滚动方向判断，向下隐藏，向上显示
    if (window.scrollY > lastScrollY && window.scrollY > 60) {
        isNavbarHidden.value = true
    } else {
        isNavbarHidden.value = false
    }
    lastScrollY = window.scrollY
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

const navItems = reactive<NavItem[]>([
    {
        title: '首页',
        href: '/'
    },
    {
        title: '解决方案',
        href: '#',
        children: [
            { title: '幻觉率评估', href: '/solution/hallucination' },
            { title: '越狱情况评估', href: '/solution/jailbreaking' },
            { title: '案例分析', href: '/solution/case' },
            
            // { title: '工具使用说明', href: '/tool-usage' },
            // { title: '相关技术', href: '#' }
        ]
    },
    {
        title: '相关研究',
        href: '#',
        children: [
            { title: '工具&框架', 
            href: '/aisec/LifecycleIndex' ,
                children: [
                    { title: '事前 · 安全设计', href: '/aisec/before' },
                    { title: '事中 · 实时预防', href: '/aisec/during' },
                    { title: '事后 · 闭环强化', href: '/aisec/after' }
                ]
            },
            { title: '分析&洞察', href: '/zhishiku/mdlist' },
            { title: '安全数据集', href: '/aisec/DatasetsIndex' }
        ]
    },
    {
        title: '最新报道',
        href: '#',
        children: [
            { title: '医疗健康', href: '/hangye/yiliaojiankang' },
            { title: '金融服务', href: '/hangye/jinrongfuwu' },
            { title: '制造业', href: '/hangye/zhizaoye' },
            { title: '零售与电商', href: '/hangye/linshoudianshang' },
            { title: '教育与培训', href: '/hangye/jiaoyupeixun' }]
    },

    {
        title: '模型排行',
        href: '/solution/rank',
        
    },
    {
        title: '政策驱动',
        href: '#',
        children: [
            // { title: '《生成式人工智能服务管理暂行办法》', href: '/law1' },
            // { title: '《互联网信息服务算法推荐管理规定》', href: '/law2' },
            // { title: '《互联网信息服务深度合成管理规定》', href: '/law3' },
            { title: '国内政策', href: '/law5' },
            { title: '国外政策', href: '/law4' },
            { title: '政策解读', href: '/law6' }
        ]
    },
    {
        title: '虚拟仿真实验',
        href: '/experiment',
    },
    {
        title: '测试平台',
        href: '/solution/adversarial-test',
    }
    
    // {
    //     title: '关于我们',
    //     href: '#',
    //     children: [
    //         { title: '联系我们', href: '/guanyuwomen/lianxiwomen' },
    //         { title: '合作伙伴', href: '/guanyuwomen/hezuohuoban' },
    //         { title: '知识产权', href: '/guanyuwomen/zhishichanquan' },
    //         // { title: '荣誉介绍', href: '/guanyuwomen/rongyujieshao' },
    //     ]
    // },

])
</script>
<style scoped>
      /* 自定义字体和背景 */
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
            background-color: #f8fafc;
        }

        .dark body {
            background-color: #020617;
        }

        /* 主菜单进入和离开的动画 */
        .menu-fade-enter-active,
        .menu-fade-leave-active {
            transition: all 0.3s ease-in-out;
        }

        .menu-fade-enter-from,
        .menu-fade-leave-to {
            opacity: 0;
            transform: translateY(-10px);
        }

        /* 子菜单展开和收起的动画 */
        .submenu-wrapper {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.4s ease-in-out;
        }

        .submenu-wrapper.open {
            grid-template-rows: 1fr;
        }

        .submenu {
            overflow: hidden;
        }
</style>
<style scoped>
.navbar-hidden {
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
}
</style>
