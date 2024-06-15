export default async function () {
	await global.pgContainer.stop()
}