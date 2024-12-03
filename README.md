<h1>프로젝트 생성 방법</h1>
<pre>
npx create-react-app web
</pre>
<p>root경로에 .gitignore 추가</p>
<pre>
# 무시하지 않을 항목들
!web/src/
!web/public/
!web/package.json
!web/package-lock.json
# intellij file
/.idea
.log
#  macOS file
.DS_Store
# testing with `Jest`
/coverage
# production
/web/build
# misc
/web/node_modules
/web/.env
/web/.env.*
# dependencies
/web/.pnp.*
/web/.pnp.js

npm-debug.log*
yarn-debug.log*
yarn-error.log*
</pre>

<p>Git의 인덱스에서 commit 예외하려는 것 제거</p>
<pre>
<code>
git rm --cached -r .idea
git commit -m "first commit : Refresh .gitignore rule"
</code>
</pre>