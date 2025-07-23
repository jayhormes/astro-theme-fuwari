<script>
import { onMount } from "svelte";

export let collections;
export let posts;

let selectedCollection = null;
let filteredPosts = [];

onMount(() => {
	console.log("GalleryPanel mounted with:", {
		collections,
		posts: posts?.length,
	});
	if (collections && collections.length > 0) {
		selectedCollection = collections[0];
		updateFilteredPosts();
	}
});

function selectCollection(collection) {
	selectedCollection = collection;
	updateFilteredPosts();
}

function updateFilteredPosts() {
	if (!selectedCollection || !posts) return;

	console.log("Filtering with collection:", selectedCollection);

	filteredPosts = posts.filter((post) => {
		if (!post.data || !post.data.tags) return false;
		const hasTag = selectedCollection.tags.some((tag) =>
			post.data.tags.some(
				(postTag) => postTag.toLowerCase() === tag.toLowerCase(),
			),
		);
		if (hasTag) {
			console.log(
				"Found matching post:",
				post.data.title,
				"with tags:",
				post.data.tags,
			);
		}
		return hasTag;
	});

	console.log("Filtered posts count:", filteredPosts.length);
}

function formatDate(date) {
	const d = typeof date === "string" ? new Date(date) : date;
	return d.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

function getPostUrl(slug) {
	return `/posts/${slug}/`;
}
</script>

<div
class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32">
    <div class="card-base z-10 px-9 py-6 relative w-full">
        <div class="mb-6">
            <h1 class="text-3xl font-bold mb-4">Gallery Collections</h1>
            
            <!-- Debug Info -->
            <div class="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                <p>Collections: {collections ? collections.length : 0}</p>
                <p>Posts: {posts ? posts.length : 0}</p>
                <p>Selected: {selectedCollection ? selectedCollection.name : 'None'}</p>
                <p>Filtered: {filteredPosts.length}</p>
            </div>
            
            <!-- Collection Tabs -->
            {#if collections && collections.length > 0}
                <div class="flex flex-wrap gap-2 mb-6">
                    {#each collections as collection}
                        <button
                            class="px-4 py-2 rounded-full border transition-colors duration-200"
                            class:active={selectedCollection === collection}
                            on:click={() => selectCollection(collection)}
                        >
                            {collection.name}
                        </button>
                    {/each}
                </div>
            {/if}

            <!-- Collection Info -->
            {#if selectedCollection}
                <div class="mb-6 p-4 bg-[var(--card-bg)] rounded-lg border border-[var(--line-divider)]">
                    <h2 class="text-xl font-semibold mb-2">{selectedCollection.name}</h2>
                    {#if selectedCollection.description}
                        <p class="text-[var(--content-text-color)] mb-2">{selectedCollection.description}</p>
                    {/if}
                    <div class="flex flex-wrap gap-2">
                        {#each selectedCollection.tags as tag}
                            <span class="px-2 py-1 text-xs bg-[var(--primary)] text-white rounded">
                                #{tag}
                            </span>
                        {/each}
                    </div>
                    <p class="text-sm text-[var(--content-text-color)] mt-2">
                        Found {filteredPosts.length} posts
                    </p>
                </div>
            {/if}
        </div>

        <!-- Posts Display -->
        {#if selectedCollection && filteredPosts.length > 0}
            {#if selectedCollection.displayMode === 'table'}
                <!-- Table View -->
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="border-b border-[var(--line-divider)]">
                                <th class="text-left py-3 px-4 font-semibold">Cover</th>
                                <th class="text-left py-3 px-4 font-semibold">Title</th>
                                <th class="text-left py-3 px-4 font-semibold">Date</th>
                                <th class="text-left py-3 px-4 font-semibold">Tags</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each filteredPosts as post}
                                <tr class="border-b border-[var(--line-divider)] hover:bg-[var(--card-bg)] transition-colors">
                                    <td class="py-3 px-4">
                                        {#if post.data.image}
                                            <img 
                                                src={post.data.image} 
                                                alt={post.data.title}
                                                class="w-16 h-16 object-cover rounded-lg"
                                            />
                                        {:else}
                                            <div class="w-16 h-16 bg-[var(--line-divider)] rounded-lg flex items-center justify-center">
                                                <span class="text-xs text-[var(--content-text-color)]">No Image</span>
                                            </div>
                                        {/if}
                                    </td>
                                    <td class="py-3 px-4">
                                        <a 
                                            href={getPostUrl(post.slug)} 
                                            class="font-medium hover:text-[var(--primary)] transition-colors"
                                        >
                                            {post.data.title}
                                        </a>
                                        {#if post.data.description}
                                            <p class="text-sm text-[var(--content-text-color)] mt-1">
                                                {post.data.description}
                                            </p>
                                        {/if}
                                    </td>
                                    <td class="py-3 px-4 text-sm text-[var(--content-text-color)]">
                                        {formatDate(post.data.published)}
                                    </td>
                                    <td class="py-3 px-4">
                                        <div class="flex flex-wrap gap-1">
                                            {#each post.data.tags.slice(0, 3) as tag}
                                                <span class="px-2 py-1 text-xs bg-[var(--line-divider)] rounded">
                                                    {tag}
                                                </span>
                                            {/each}
                                            {#if post.data.tags.length > 3}
                                                <span class="px-2 py-1 text-xs text-[var(--content-text-color)]">
                                                    +{post.data.tags.length - 3}
                                                </span>
                                            {/if}
                                        </div>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {:else}
                <!-- Grid View -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each filteredPosts as post}
                        <div class="bg-[var(--card-bg)] rounded-lg border border-[var(--line-divider)] overflow-hidden hover:shadow-lg transition-shadow">
                            {#if post.data.image}
                                <img 
                                    src={post.data.image} 
                                    alt={post.data.title}
                                    class="w-full h-48 object-cover"
                                />
                            {:else}
                                <div class="w-full h-48 bg-[var(--line-divider)] flex items-center justify-center">
                                    <span class="text-[var(--content-text-color)]">No Image</span>
                                </div>
                            {/if}
                            <div class="p-4">
                                <h3 class="font-semibold mb-2">
                                    <a 
                                        href={getPostUrl(post.slug)} 
                                        class="hover:text-[var(--primary)] transition-colors"
                                    >
                                        {post.data.title}
                                    </a>
                                </h3>
                                {#if post.data.description}
                                    <p class="text-sm text-[var(--content-text-color)] mb-3">
                                        {post.data.description}
                                    </p>
                                {/if}
                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-[var(--content-text-color)]">
                                        {formatDate(post.data.published)}
                                    </span>
                                    <div class="flex flex-wrap gap-1">
                                        {#each post.data.tags.slice(0, 2) as tag}
                                            <span class="px-2 py-1 text-xs bg-[var(--line-divider)] rounded">
                                                {tag}
                                            </span>
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        {:else if selectedCollection}
            <div class="text-center py-12">
                <p class="text-[var(--content-text-color)]">
                    No posts found for this collection. Try adding posts with tags: 
                    {selectedCollection.tags.join(', ')}
                </p>
            </div>
        {:else}
            <div class="text-center py-12">
                <p class="text-[var(--content-text-color)]">
                    No collections configured.
                </p>
            </div>
        {/if}
    </div>
</div>

<style>
    button {
        border: 1px solid var(--line-divi_line_divider

button: hover;
{
	border - color;
	:
	var(--primary);
	color: var(--primary);
}

button.active;
{
	background - color;
	:
	var(--primary);
	color: white;
	border - color;
	:
	var(--primary);
}
</style>
