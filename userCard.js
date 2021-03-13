/**Define template that will be injected into the shadow dom */
const template = document.createElement('template');
template.innerHTML = `
    <style>
       .user-card {
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
		width: 500px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 10px;
		margin-bottom: 15px;
		border-bottom: darkorchid 5px solid;
	}
    .user-card > section > h2 {
        color: coral;
    }
	.user-card img {
		width: 100%;
	}

	.user-card button {
		cursor: pointer;
		background: darkorchid;
		color: #fff;
		border: 0;
		border-radius: 5px;
		padding: 5px 10px;
    }
    ul.content {
        list-style: none;
        padding: 0;
    }
    li {
        color: darkblue;
    }
    a {
        text-decoration: none;
        color: orangered;
    }
    .display-none {
        visibility: hidden;
    }
    </style>
    <div class="user-card">
        <img loading="lazy" src="" alt="" />
        <section>
            <h2></h2>
            <ul class="content">
                <li class="email"><a href=""></a></li>
                <li class="phone"><a href=""></a></li>
                <li><slot name="country"></slot></li>
            </ul>
            <button type="button" id="toggleInfo">Toggle Info</button>
        </section>
    </div>
`;

/** Define custom element class, that extends HTMLElement */
class UserCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h2').innerHTML = `${this.getAttribute('name')}`;
        this.shadowRoot.querySelector('img').src = `${this.getAttribute('avatar')}`;
        this.shadowRoot.querySelector('img').alt = `Avatar of ${this.getAttribute('name')}`;
        this.shadowRoot.querySelector('li.email>a').href = `mailto:${this.getAttribute('email')}`;
        this.shadowRoot.querySelector('li.email>a').innerHTML = `Email: ${this.getAttribute('email')}`;
        this.shadowRoot.querySelector('li.phone>a').href = `tel:${this.getAttribute('phone')}`;
        this.shadowRoot.querySelector('li.phone>a').innerHTML = `Phonenumber: ${this.getAttribute('phone')}`;
    }

    toggleInfo() {
        this.shadowRoot.querySelector('ul.content').classList.toggle("display-none");
    }
    connectedCallback() {
        this.shadowRoot.querySelector("#toggleInfo").addEventListener("click", (event) => {
            console.log(event.target)
            this.toggleInfo();
        })
    }

    disconnectedCallback() {
         this.shadowRoot.querySelector("#toggleInfo").removeEventListener();
    }
}

window.customElements.define('user-card', UserCard);