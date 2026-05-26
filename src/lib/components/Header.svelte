<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { Menu, X, Home, FileText, Video, Calendar, Mic, User, Mail, Sparkles, Users, ChevronDown, BarChart3 } from 'lucide-svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let mobileMenuOpen = false;
	let contentOpen = false;
	let speakingOpen = false;
	let communityOpen = false;
	let aboutOpen = false;

	interface NavLink {
		href: string;
		label: string;
		icon: any;
	}

	interface NavDropdown {
		label: string;
		icon: any;
		children: NavLink[];
	}

	type NavItem = NavLink | NavDropdown;

	function isDropdown(item: NavItem): item is NavDropdown {
		return 'children' in item;
	}

	// Consolidated from 8 top-level items to 6 (#fix-4 #fix-5)
	const navItems: NavItem[] = [
		{ href: '/', label: 'Home', icon: Home },
		{ href: '/services', label: 'Services', icon: BarChart3 },
		{
			label: 'Content',
			icon: FileText,
			children: [
				{ href: '/blog', label: 'Blog', icon: FileText },
				{ href: '/videos', label: 'Videos', icon: Video }
			]
		},
		{
			label: 'Speaking',
			icon: Mic,
			children: [
				{ href: '/talks', label: 'Talks & Workshops', icon: Mic },
				{ href: '/events', label: 'Events', icon: Calendar }
			]
		},
		{
			label: 'Community',
			icon: Users,
			children: [
				{ href: '/summit', label: 'EoEPPS', icon: Sparkles },
				{ href: '/user-group', label: 'NPPUG', icon: Users }
			]
		},
		{ href: '/about', label: 'About', icon: User },
		{ href: '/contact', label: 'Contact', icon: Mail }
	];

	let isDark = false;
	let observer: MutationObserver;

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
		observer = new MutationObserver(() => {
			isDark = document.documentElement.classList.contains('dark');
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
	});

	onDestroy(() => observer?.disconnect());

	$: logoSmall = isDark ? '/logo-dark-small.png' : '/logo-light-small.png';

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMenu() {
		mobileMenuOpen = false;
		contentOpen = false;
		speakingOpen = false;
		communityOpen = false;
		aboutOpen = false;
	}

	function toggleDropdown(name: string) {
		contentOpen   = name === 'content'   ? !contentOpen   : false;
		speakingOpen  = name === 'speaking'  ? !speakingOpen  : false;
		communityOpen = name === 'community' ? !communityOpen : false;
		aboutOpen     = name === 'about'     ? !aboutOpen     : false;
	}

	// Reactive object so Svelte tracks each variable directly in the template
	$: openStates = { Content: contentOpen, Speaking: speakingOpen, Community: communityOpen, About: aboutOpen } as Record<string, boolean>;

	function closeDropdowns() {
		contentOpen = false;
		speakingOpen = false;
		communityOpen = false;
		aboutOpen = false;
	}

	function handleDropdownKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeDropdowns();
			(e.currentTarget as HTMLElement)?.closest('.relative')?.querySelector('button')?.focus();
		}
	}

	function isChildActive(children: NavLink[], path: string): boolean {
		return children.some(c => c.href === path);
	}

	$: currentPath = $page.url.pathname;
</script>

<svelte:window on:click={closeDropdowns} />

<header class="sticky top-0 z-50 bg-surface border-b border-border">
	<nav class="container-custom">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="logo-link" aria-label="Duncan Boyne home">
				<img src={logoSmall} alt="Duncan Boyne" class="logo-small" />
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-4">
				{#each navItems as item}
					{#if isDropdown(item)}
						<div class="relative">
							<button
								on:click|stopPropagation={() => toggleDropdown(item.label.toLowerCase())}
								on:keydown={(e) => e.key === 'Escape' && closeDropdowns()}
								class="flex items-center gap-1.5 text-sm font-medium transition-colors px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent {isChildActive(item.children, currentPath)
									? 'text-accent bg-accent/10'
									: 'text-muted hover:text-text hover:bg-border'}"
								aria-expanded={openStates[item.label]}
								aria-haspopup="true"
							>
								<svelte:component this={item.icon} class="w-4 h-4" />
								{item.label}
								<ChevronDown class="w-3 h-3 transition-transform {openStates[item.label] ? 'rotate-180' : ''}" aria-hidden="true" />
							</button>

							{#if openStates[item.label]}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<div
									class="absolute top-full left-0 mt-1 w-48 bg-surface border border-border rounded-xl shadow-lg py-2 z-50"
									role="menu"
									tabindex="-1"
									on:click|stopPropagation
									on:keydown={handleDropdownKeydown}
								>
									{#each item.children as child}
										<a
											href={child.href}
											on:click={closeDropdowns}
											role="menuitem"
											class="flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent {currentPath === child.href
												? 'text-accent bg-accent/10'
												: 'text-muted hover:text-text hover:bg-border'}"
										>
											<svelte:component this={child.icon} class="w-4 h-4" aria-hidden="true" />
											{child.label}
										</a>
									{/each}
								</div>
							{/if}
						</div>
					{:else}
						<a
							href={item.href}
							class="flex items-center gap-2 text-sm font-medium transition-colors px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent {currentPath === item.href
								? 'text-accent bg-accent/10'
								: 'text-muted hover:text-text hover:bg-border'}"
						>
							<svelte:component this={item.icon} class="w-4 h-4" />
							{item.label}
						</a>
					{/if}
				{/each}
				<ThemeToggle />
			</div>

			<!-- Mobile Menu Button -->
			<div class="flex items-center md:hidden space-x-2">
				<ThemeToggle />
				<button
					on:click={toggleMenu}
					class="p-2 rounded-lg text-muted hover:text-text hover:bg-border focus:outline-none focus:ring-2 focus:ring-accent"
					aria-label="Toggle menu"
					aria-expanded={mobileMenuOpen}
				>
					{#if mobileMenuOpen}
						<X class="w-6 h-6" />
					{:else}
						<Menu class="w-6 h-6" />
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		{#if mobileMenuOpen}
			<div class="md:hidden py-4 border-t border-border">
				<div class="flex flex-col space-y-1">
					{#each navItems as item}
						{#if isDropdown(item)}
							<button
								on:click|stopPropagation={() => toggleDropdown(item.label.toLowerCase())}
								class="flex items-center justify-between w-full px-3 py-2 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent {isChildActive(item.children, currentPath)
									? 'text-accent bg-accent/10'
									: 'text-muted hover:text-text hover:bg-border'}"
								aria-expanded={openStates[item.label]}
							>
								<span class="flex items-center gap-3">
									<svelte:component this={item.icon} class="w-5 h-5" />
									{item.label}
								</span>
								<ChevronDown class="w-4 h-4 transition-transform {openStates[item.label] ? 'rotate-180' : ''}" aria-hidden="true" />
							</button>

							{#if openStates[item.label]}
								<div class="ml-6 flex flex-col space-y-1">
									{#each item.children as child}
										<a
											href={child.href}
											on:click={closeMenu}
											class="flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent {currentPath === child.href
												? 'text-accent bg-accent/10'
												: 'text-muted hover:text-text hover:bg-border'}"
										>
											<svelte:component this={child.icon} class="w-5 h-5" />
											{child.label}
										</a>
									{/each}
								</div>
							{/if}
						{:else}
							<a
								href={item.href}
								on:click={closeMenu}
								class="flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent {currentPath === item.href
									? 'text-accent bg-accent/10'
									: 'text-muted hover:text-text hover:bg-border'}"
							>
								<svelte:component this={item.icon} class="w-5 h-5" />
								{item.label}
							</a>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
	</nav>
</header>

<style>
	.logo-link {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		line-height: 0;
	}
	.logo-small {
		display: block;
		height: 2rem;
		width: auto;
		object-fit: contain;
		object-position: left center;
	}
</style>
