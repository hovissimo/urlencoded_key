// View documentation at: https://docs.begin.com
export default function Html ({ html, state }) {
  const { store } = state
  const thingy = store.thingy || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <enhance-form
  action="/thingies/${thingy.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Thingy">
  <enhance-text-input label="Name" type="text" id="name" name="name" value="${thingy?.name}" errors="${problems?.name?.errors}"></enhance-text-input>
  <input type="hidden" id="key" name="key" value="${thingy?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}
