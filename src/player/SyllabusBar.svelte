
<script>
	export let links = [];
  
	// Extract unique tags
	$: tags = [...new Set(links.map(l => l.tag))];
  
	let selectedTag = null;
  
	$: if (tags.length && !selectedTag) {
	  selectedTag = tags[0];
	}
  
	$: filteredLinks = links.filter(l => l.tag === selectedTag);
  </script>
  
  <div class="sidebar">
  
	<select class="select" bind:value={selectedTag}>
	  {#each tags as tag}
		<option value={tag}>{tag}</option>
	  {/each}
	</select>
  
	<div class="list">
	  {#each filteredLinks as link}
		<a class="card" href={`/play/${link.deck}`}>
		  <!-- <img class="thumb" src={`/public/images/${link.image}`} alt={link.title} /> -->
		  <img class="thumb" src={`/public/images/box.webp`} alt={link.title} />
		  <div class="title">{link.title}</div>
		</a>
	  {/each}
	</div>
  
  </div>
  
  <style>
  .sidebar {
	width: 100%;
	padding: 5px;
	box-sizing: border-box;
	/* background-color: #081B7A; */
	/* background-color: grey; */
	min-height:100vw;
  }
  
  .select {
	width: 100%;
	margin-bottom: 12px;
	padding: 6px 10px;
	border-radius: 8px;
	border: 1px solid #e2e8f0;
	background: #f8fafc;
	font-size: 13px;
	outline: none;
	cursor: pointer;
  }
  
  .list {
	display: flex;
	flex-direction: column;
	gap: 10px;
  }
  
  .card {
	display: flex;
	flex-direction: column;
	text-decoration: none;
	color: inherit;
	background: #f8fafc;
	border-radius: 10px;
	overflow: hidden;
	transition: background 0.2s ease, transform 0.15s ease;
  }
  
  .card:hover {
	background: #e2e8f0;
	transform: translateY(-2px);
  }
  
  .thumb {
	width: 100%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
  }
  
  .title {
	font-size: 13px;
	font-weight: 500;
	padding: 6px 8px;
  }
  </style>