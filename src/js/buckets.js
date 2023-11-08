export const bucketsTypes = [
  { 
    name: 'RÁC HỮU CƠ', 
    colorName: 'yellow', 
    color: '#ffd204', 
    emojis: ['🌱', '🥀', '🧻', '🥬', '🥝', '🥭', '🍕', '🥪','🥦' , '🥑'] 
  },
  { 
    name: 'RÁC TÁI CHẾ', 
    colorName: 'green', 
    color: '#8ec10f', 
    emojis: ['🗳️', '🧃', '👕', '✉️', '🪓', '🪵', '🍸', '📦', '🥫'] 
  },
  { 
    name: 'RÁC KHÓ PHÂN HỦY', 
    colorName: 'blue', 
    color: '#0363f2', 
    emojis: ['⏰', '🥚', '💾', '💿', '🛞', '💼', '👢', '🏈'] 
  },
  { 
    name: 'RÁC THẢI NGUY HẠI', 
    colorName: 'red', 
    color: '#df2726', 
    emojis: ['🖥️', '🌡️', '🧪',  '💡', '🛢️', '💉', '💊', '💻', '📺', '🔋'] 
  },
];

export default function addBuckets() {
  const bucketsElement = document.querySelector('.buckets')
  const bucketTemplate = document.querySelector('#bucket')

  bucketsTypes.forEach((type, index) => {
    const bucketClone = bucketTemplate.content.cloneNode(true)

    const bucketLabel = bucketClone.querySelector('.bucket__label')

    bucketLabel.textContent = type.name
    bucketLabel.style.backgroundColor = type.color

    const bucketContainer =  bucketClone.querySelector('.bucket__container')
    const bucketTop =  bucketClone.querySelector('.bucket__top')
    const bucketBase =  bucketClone.querySelector('.bucket__base')

    bucketTop.style.zIndex = 50 - index
    bucketBase.style.zIndex = 100 - index
    bucketContainer.dataset.color = type.color
    bucketTop.dataset.color = type.color
    bucketTop.setAttribute('src', `./assets/images/wastetop_${type.colorName}.jpg`)
    bucketTop.setAttribute('alt', `wastetop_${type.colorName}`)
    bucketBase.setAttribute('src', `./assets/images/wastebox_${type.colorName}.jpg`)
    bucketBase.setAttribute('alt', `wastebox_${type.colorName}`)

    bucketsElement.append(bucketClone)
  })
}
