// View documentation at: https://docs.begin.com
export default function Html({ html, state }) {
  const { store } = state;
  let encodedthingies = store.encodedthingies || [];
  const encodedthingy = store.encodedthingy || {};
  const problems = store.problems || {};

  return html`<enhance-page-container>
    <main>
      <h1 class="mb1 font-semibold text3">Encodedthingies page</h1>
      ${encodedthingies
    .map(
      (item) => `<article class="mb2">
<div class="mb0">
  <p class="pb-2"><strong class="capitalize">key: </strong>${
  item?.key || ""
}</p>
  <p class="pb-2"><strong class="capitalize">created at: </strong>${
  item?.created_at || ""
}</p>
</div>
<p class="mb-1">
  <enhance-link href="/encodedthingies/${
  item.key
}">Edit this encodedthingy</enhance-link>
</p>
<form action="/encodedthingies/${encodeURIComponent(
    item.key
  )}/delete" method="POST" class="mb-1">
  <enhance-submit-button><span slot="label">Delete this encodedthingy</span></enhance-submit-button>
</form>
</article>`
    )
    .join("\n")}
      <details class="mb0" ${Object.keys(problems).length ? "open" : ""}>
        <summary>New encodedthingy</summary>
        <enhance-form
          action="/encodedthingies/${encodedthingy.key}"
          method="POST"
        >
          <div class="${problems.form ? "block" : "hidden"}">
            <p>Found some problems!</p>
            <ul>
              ${problems.form}
            </ul>
          </div>
          <enhance-fieldset legend="Encodedthingy">
            <enhance-text-input
              readonly
              label="Created at"
              type="text"
              id="created_at"
              name="created_at"
              value="${encodedthingy?.created_at}"
              errors="${problems?.created_at?.errors}"
            ></enhance-text-input>
            <input
              type="hidden"
              id="key"
              name="key"
              value="${encodedthingy?.key}"
            />
            <enhance-submit-button style="float: right"
              ><span slot="label">Save</span></enhance-submit-button
            >
          </enhance-fieldset>
        </enhance-form>
      </details>
    </main>
  </enhance-page-container> `;
}
