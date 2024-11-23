import { createSignal, onMount } from "solid-js";
import PocketBase from 'pocketbase';

const url = 'https://eliza.pockethost.io/';
const client = new PocketBase(url);

export default function Contacts({lang}) {
	const [item, setItem] = createSignal([]);
	const [loading, setLoading] = createSignal(true);

	onMount(async () => {
		console.log('test')
		try {
			const res = await client.collection('contacts').getList(1, 50);
			setItem(res.items[1]);
			setLoading(false);
		} catch (err) {
			console.error('Error fetching items:', err);
		}
	});
	const title = {
		lv: "Izstrādājumu",
		ru: "Производство",
		en: "Production of the goods",
	}
	return <>
		<Show when={loading()}>
			<div class="col-md-6">
				<div class="text-area">
				<h3>{title[lang]}</h3>
					<div class="email">
						<p><i class="fa fa-envelope"></i>order@eliza-k.lv</p>
						<p>
							<i class="fa fa-phone"></i>27862121, 26653510
						</p>
					</div>
					<div class="loc d-flex">
						<i class="fa fa-map-marker-alt"></i>
						<p>
							Rīga, A. Deglava iela 52A, LV-1035
						</p>
					</div>
				</div>
			</div>
		</Show>
		<Show when={!loading()}>
			<div class="col-md-6">
				<div class="text-area">
				<h3>{title[lang]}</h3>
					<div class="email">
						<p><i class="fa fa-envelope"></i>{item().email}</p>
						<p>
							<i class="fa fa-phone"></i>{item().phone}
						</p>
					</div>
					<div class="loc d-flex">
						<i class="fa fa-map-marker-alt"></i>
						<p>
						{item().address}
						</p>
					</div>
					<div class="time">
						<p>{item()['weekday_' + lang]}</p>
						<p>{item()['break_' + lang]}</p>
						<p>{item()['weeken_' + lang]}</p>
					</div>
				</div>
			</div>
		</Show>
	</>
}