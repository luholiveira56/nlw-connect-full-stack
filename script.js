const app = document.getElementById("app")
// Array, vetor, lista para definir os usuarios para teste
const users = [ 
  {
    email: 'test@test.com',
    phone: '99999999999',
    ref: 100, // Referencia do usuario
    refBy: null
  },
  {
    email: 'tust@tust.com',
    phone: '99999999999',
    ref: 200, // Referencia do usuario
    refBy: 100 // Referencia de outro usuario
  },
  {
    email: 'tost@tost.com',
    phone: '99999999999',
    ref: 300, // Referencia do usuario
    refBy: 200 // Referencia de outro usuario
  }
]

// Função para pegar as informações dos usuarios 
// Comparando entre o array users e o campo email do formulario
const getUser = (userData) => {
  return users.find((user) => {
    return user.email == userData.email
  })
}

// Função pegar o total de inscritos do usuario
const getTotalSubscribers = (userData) => {
  const subs = users.filter((user) => {
    return user.refBy == userData.ref
  })
  return subs.length
}

// Função para mostrar tela de convite
const showInvite = (userData) => {
  app.innerHTML = `
    <main>
      <h3>Inscrição confirmada!</h3>
      <p>
        Convide mais pessoas e concorra a prêmios! <br/>
        Compartilhe o link e acompanhe as inscrições:
      </p>
      <div class="input-group">
        <label for="link">
          <img src="link.svg" alt="Link icon">
        </label>
        <input type="text" id="link" value="https://evento.com?ref=${userData.ref}"disabled>
      </div>
    </main>

    <section class="stats">
      <h4>
        ${getTotalSubscribers(userData)}
      </h4>
      <p>
        inscrições feitas
      </p>
    </section>
  `
  app.setAttribute('class', 'page-invite')
  updateImageLinks()
}

// Função para salvar o novo usuario
const saveUser = (userData) => {
  const newUser = {
    ...userData,
    ref: Math.round(Math.random() * 4000),
    refBy: 100 // Obs: Esse valor deve ser aleatorio pegando diratamente pela url
  }

  users.push(newUser) // Puxar os novos usuarios para alinentar o array users
  return newUser
}

// Função para capturar o formulario e dar uma ordem de evento
const formAction = () => {
  const form = document.getElementById("form")
  form.onsubmit = (event) => {
    event.preventDefault() // Não permitir realizar nenhuma ação ao clicar no botão 'Confirmar'
    const formData = new FormData(form) // Ler os names do input da função startApp
    const userData = {
      email: formData.get('email'),
      phone: formData.get('phone')
    } // Pegar os dados passados nos campos email e telefone da inscrição

    // Condição para mostrar o convite do usuario e novo usuario
    const user = getUser(userData) 
    if(user) {
      showInvite(user)
    } else {
      const newUser = saveUser(userData)
      showInvite(newUser)
    }

  }
}

// // Função para buscar os links das imagens
// const updateImageLinks = () => {
//   document.querySelectorAll('img').forEach((img) => {
//     if(img.src.includes('githubusercontent')) {
//       return
//     }
//     const src = img.getAttribute('src')
//     img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`
//   })
// }

// Se você estiver usando qualquer outro editor de código, substitua a função acima por essa função:

const updateImageLinks = () => {
    document.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute("src"); 
      if (src && !src.startsWith("http")) {  
        img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
      }
    });
  };

// Função para capturar o envio dos dados de Inscrição
const startApp = () => {
  const content = `
  <main>
    <section class="about">
      <div class="section-header">
        <h2>
          Sobre o evento
        </h2>
        <span class="badge">AO VIVO</span>
      </div>

      <p>
        Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
        <br/> <br/>
        Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito
      </p>
    </section>

    <section class="registration">
      <h2>Inscrição</h2>

      <form id="form">
        <div class="input-wrapper">
          <div class="input-group">
            <label for="email">
              <img src="mail.svg" alt="Email icon">
            </label>
            <input type="email" id="email" name="email" placeholder="E-mail">
          </div>

          <div class="input-group">
            <label for="phone">
              <img src="phone.svg" alt="Phone icon">
            </label>
            <input type="text" id="phone" name="phone" placeholder="Telefone">
          </div>
        </div>

        <button>
          Confirmar
          <img src="arrow.svg" alt="Arrow right">
        </button>
      </form>
    </section>
  </main>
  `

  app.innerHTML = content
  app.setAttribute('class', 'page-start')
  updateImageLinks()
  formAction()
}
startApp()

document.querySelector("header").onclick = () => startApp() // Inicializar para a tela do formulario