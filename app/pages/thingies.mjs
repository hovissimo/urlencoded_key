// View documentation at: https://docs.begin.com
export default function Html({ html, state }) {
  const { store } = state;
  let thingies = store.thingies || [];
  const thingy = store.thingy || {};
  const problems = store.problems || {};

  return html`<enhance-page-container>
    <main>
      <h1 class="mb1 font-semibold text3">Thingies page</h1>
      ${thingies
    .map(
      (item) => `<article class="mb2">
<div class="mb0">
  <p class="pb-2"><strong class="capitalize">name: </strong>${
  item?.name || ""
}</p>
  <p class="pb-2"><strong class="capitalize">key: </strong>${
  item?.key || ""
}</p>
</div>
<p class="mb-1">
  <enhance-link href="/thingies/${item.key}">Edit this thingy</enhance-link>
</p>
<form action="/thingies/${item.key}/delete" method="POST" class="mb-1">
  <enhance-submit-button><span slot="label">Delete this thingy</span></enhance-submit-button>
</form>
</article>`
    )
    .join("\n")}
      <details class="mb0" ${Object.keys(problems).length ? "open" : ""}>
        <summary>New thingy</summary>
        <enhance-form action="/thingies/${thingy.key}" method="POST">
          <div class="${problems.form ? "block" : "hidden"}">
            <p>Found some problems!</p>
            <ul>
              ${problems.form}
            </ul>
          </div>
          <enhance-fieldset legend="Thingy">
            <enhance-text-input
              label="Name"
              type="text"
              id="name"
              name="name"
              value="${thingy?.name}"
              errors="${problems?.name?.errors}"
            ></enhance-text-input>
            <input type="hidden" id="key" name="key" value="${thingy?.key}" />
            <enhance-submit-button style="float: right"
              ><span slot="label">Save</span></enhance-submit-button
            >
          </enhance-fieldset>
        </enhance-form>
      </details>
    </main>
  </enhance-page-container> `;
}
