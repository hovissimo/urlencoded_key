// View documentation at: https://docs.begin.com
export default function Html ({ html, state }) {
  const { store } = state
  const encodedthingy = store.encodedthingy || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <enhance-form
  action="/encodedthingies/${encodedthingy.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Encodedthingy">
  <input type="hidden" id="key" name="key" value="${encodedthingy?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}
