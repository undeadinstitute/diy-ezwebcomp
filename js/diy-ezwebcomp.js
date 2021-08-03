//Add your javascript here








customElements.define("zombie-profile", class extends HTMLElement {
	constructor() {
		super();
		let e = document.getElementById("zprofiletemplate").content;
		this.attachShadow({
			mode: "open"
		}).appendChild(e.cloneNode(!0));
		let t = this.shadowRoot.querySelector(".messagebtn"),
			n = this.shadowRoot.querySelector(".profile-wrapper"),
			a = this.getElementsByTagName("span")[0].innerHTML;
		t.addEventListener("click", (function (e) {
			let t = document.createElement("form"),
				i = document.createElement("input"),
				r = document.createElement("label"),
				o = document.createElement("textarea"),
				d = document.createElement("label"),
				l = document.createElement("input"),
				s = document.createElement("button");
			t.setAttribute("method", "get"), t.setAttribute("action", "https://johnrhea.com/undead-form-practice.php"), t.classList.add("hello"), s.innerHTML = "x", s.addEventListener("click", (function () {
				t.remove()
			})), i.setAttribute("type", "text"), i.setAttribute("name", "subj"), r.setAttribute("for", "subj"), r.innerHTML = "Subject:", o.setAttribute("name", "cntnt"), o.innerHTML = "Hi " + a + ",\nI like your braaains...", d.setAttribute("for", "cntnt"), d.innerHTML = "Message:", l.setAttribute("type", "submit"), l.setAttribute("value", "Send Message"), t.appendChild(s), t.appendChild(r), t.appendChild(i), t.appendChild(d), t.appendChild(o), t.appendChild(l), n.appendChild(t)
		}))
	}
});